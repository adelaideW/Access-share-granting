/**
 * Builds, serves `vite preview` briefly, captures a 2× DPR PNG of ?demo=sharing-shot.
 *
 * Usage: node scripts/capture-sharing-screenshot.mjs
 * Output: prototype-screenshots/sharing-access-anyone-general-link.png
 */
import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'prototype-screenshots');
const PORT = process.env.SHOT_PORT ?? '4181';
const URL = process.env.SHOT_URL ?? `http://127.0.0.1:${PORT}/?demo=sharing-shot`;
const OUT_FILE = path.join(OUT_DIR, 'sharing-access-anyone-general-link.png');

function waitMs(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitUntilUp(ms) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const ac = new AbortController();
      const id = setTimeout(() => ac.abort(), 700);
      const res = await fetch(`http://127.0.0.1:${PORT}`, { signal: ac.signal });
      clearTimeout(id);
      if (res.ok || res.status === 404) return;
    } catch {
      await waitMs(150);
    }
  }
  throw new Error(`Preview server did not respond on port ${PORT} within ${ms}ms`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });

  const viteCli = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  let child = null;
  try {
    child = spawn(process.execPath, [viteCli, 'preview', '--host', '127.0.0.1', '--port', PORT, '--strictPort'], {
      cwd: ROOT,
      stdio: 'ignore',
      env: {
        ...process.env,
        BROWSER: 'none',
        // Use project-local Playwright browsers (`npx playwright install`, PLAYWRIGHT_BROWSERS_PATH=0)
        PLAYWRIGHT_BROWSERS_PATH: process.env.PLAYWRIGHT_BROWSERS_PATH ?? '0',
      },
    });

    await waitUntilUp(60000);

    const browser = await chromium.launch({
      args: ['--font-render-hinting=medium'],
    });
    try {
      const page = await browser.newPage({
        viewport: { width: 1640, height: 940 },
        deviceScaleFactor: 2,
      });
      await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
      await page.getByRole('heading', { name: /Sharing access/i }).waitFor({ state: 'visible', timeout: 20000 });
      await page.getByText(/Anyone on the internet with the link/i).first().waitFor({ state: 'visible', timeout: 20000 });
      await page.screenshot({ path: OUT_FILE, fullPage: true });
      // Device pixel size ≈ viewport * deviceScaleFactor for fullPage width
      process.stdout.write(`Wrote ${OUT_FILE}\n`);
    } finally {
      await browser.close();
    }
  } finally {
    if (child) {
      child.kill('SIGTERM');
      await waitMs(300);
    }
  }
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
