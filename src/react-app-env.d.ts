declare module '*.png' {
  const content: number;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;

    REACT_APP_COIN_RANKING_API_KEY: string;
    REACT_APP_BING_NEWS_API_KEY: string;
  }
}
