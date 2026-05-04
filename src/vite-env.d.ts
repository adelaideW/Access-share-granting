/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical portfolio URL when `portfolioReturn` is absent (build-time env). */
  readonly VITE_PORTFOLIO_HOME_URL?: string;
}
