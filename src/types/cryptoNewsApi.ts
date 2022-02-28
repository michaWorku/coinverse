interface About {
  _type: string;
  readLink: string;
  name: string;
}

interface Mentions {
  _type: string;
  name: string;
}

interface Image {
  _type: string;
  thumbnail: {
    _type: string;
    contentUrl: string;
    width: number;
    height: number;
  };
}

interface Provider {
  _type: string;
  name: string;
  image: Image;
}

interface SearchResult {
  _type: string;
  name: string;
  url: string;
  image: Image;
  description: string;
  about: About[];
  mentions: Mentions[];
  provider: Provider[];
  datePublished: string;
  category: string;
}

interface GetCryptoNewsParams {
  newsCategory: string;
  count: number;
}

interface GetCryptoNewsResponse {
  _type: string;
  readLink: string;
  queryContext: {
    _type: string;
    originalQuery: string;
    adultIntent: boolean;
  };
  totalEstimatedMatches: number;
  sort: {
    _type: string;
    name: string;
    id: string;
    isSelected: boolean;
    url: string;
  }[];
  value: SearchResult[];
}

export type {
  About,
  Mentions,
  Provider,
  SearchResult,
  GetCryptoNewsParams,
  GetCryptoNewsResponse,
};
