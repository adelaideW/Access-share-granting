import { useLayoutEffect, useState } from 'react';

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

export function PortfolioReturnLink() {
  const [href, setHref] = useState<string | null>(null);
  useLayoutEffect(() => {
    setHref(parsePortfolioReturn(window.location.search));
  }, []);
  if (!href) return null;
  return (
    <a
      href={href}
      className="fixed left-1/2 top-4 z-[10000] max-w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 whitespace-normal rounded-[10px] border border-neutral-200 bg-white px-5 py-2.5 text-center text-[15px] leading-snug font-semibold text-neutral-950 shadow-[0_8px_32px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color,background-color] duration-150 hover:border-neutral-300 hover:bg-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A0039] focus-visible:ring-offset-2"
    >
      Back to Adelaide's portfolio
    </a>
  );
}
