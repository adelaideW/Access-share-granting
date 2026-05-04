import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** Session tab backup when `portfolioReturn` was present on an earlier load. */
const STORAGE_KEY = 'accessShareGranting_portfolioReturn';

function isAllowedPortfolioReturn(u: URL): boolean {
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
  if (u.username || u.password) return false;
  if (u.protocol === 'http:') {
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1';
  }
  return true;
}

function parsePortfolioReturn(search: string): string | null {
  let raw: string | null;
  try {
    raw = new URLSearchParams(search).get('portfolioReturn');
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    raw = decodeURIComponent(raw.trim());
  } catch {
    return null;
  }
  try {
    const u = new URL(raw);
    if (!isAllowedPortfolioReturn(u)) return null;
    return u.href;
  } catch {
    return null;
  }
}

function normalizeReturnUrl(raw: string | undefined | null): string | null {
  if (raw == null) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (!isAllowedPortfolioReturn(u)) return null;
    return u.href;
  } catch {
    return null;
  }
}

function resolvePortfolioHref(search: string): string | null {
  const fromQuery = parsePortfolioReturn(search);
  if (fromQuery) return fromQuery;
  const fromEnv = normalizeReturnUrl(import.meta.env.VITE_PORTFOLIO_HOME_URL);
  if (fromEnv) return fromEnv;
  try {
    return normalizeReturnUrl(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function PortfolioReturnLink() {
  const [href] = useState<string | null>(() =>
    typeof window !== 'undefined' ? resolvePortfolioHref(window.location.search) : null,
  );

  useEffect(() => {
    const fromQuery = parsePortfolioReturn(window.location.search);
    if (!fromQuery) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, fromQuery);
    } catch {
      /* ignore quota / privacy mode */
    }
  }, []);

  if (!href) return null;

  const anchor = (
    <a
      href={href}
      className="fixed left-1/2 top-4 z-[2147483647] -translate-x-1/2 whitespace-nowrap text-center text-[12px] leading-none font-semibold text-neutral-950 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-[box-shadow,border-color,background-color] duration-150 hover:border-neutral-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      Back to Adelaide's portfolio
    </a>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(anchor, document.body);
}
