interface GlobalCoinStats {
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
}

interface Coin {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description?: string;
  color: string;
  iconType: string;
  iconUrl: string;
  websiteUrl: string;
  socials: {
    name: string;
    url: string;
    type: string
  }[];
  links: {
    name: string;
    url: string;
    type: string
  }[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: number;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: boolean;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  penalty: boolean;
}

interface Exchange {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  iconUrl: string;
  verified: boolean;
  lastTickerCreatedAt: number;
  numberOfMarkets: number
  volume: number;
  websiteUrl: string;
  rank: number;
  marketShare: string;
}

interface HistoryRecord {
  timestamp: number;
  /* Float as string */
  price: string;
}

interface Base {
  symbol: string;
  sign: string;
}

interface CommonResponse {
  status: string;
}

interface GetGlobalStatsResponse extends CommonResponse {
  data: GlobalCoinStats;
}

interface GetCoinsResponse extends CommonResponse {
  data: {
    stats: {
      total: number;
      offset: number;
      limit: number;
      order: string;
      base: string;
    } & Omit<GlobalCoinStats, 'totalCoins'>,
    base: Base;
    coins: Coin[];
  };
}

interface GetCoinResponse extends CommonResponse {
  data: {
    base: Base;
    coin: Coin;
  };
}

interface GetExchangesResponse extends CommonResponse {
  data: {
    stats: {
      volume: number;
      total: number;
      limit: number;
      offset: number;
    };
    currencies: {
      id: number;
      uuid: string;
      type: string;
      iconUrl: string;
      name: string;
      symbol: string;
      sign: string;
    }[];
    exchanges: Exchange[];
  };
}

interface GetCryptoHistoryParams {
  coinId: number | string;
  timePeriod: string;
}

interface GetCoinHistoryResponse extends CommonResponse {
  data: {
    change: number;
    history: HistoryRecord[];
  };
}

export type {
  GlobalCoinStats,
  Coin,
  Exchange,
  HistoryRecord,
  GetGlobalStatsResponse,
  GetCoinsResponse,
  GetCoinResponse,
  GetExchangesResponse,
  GetCoinHistoryResponse,
  GetCryptoHistoryParams,
};
