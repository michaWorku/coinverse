// Dependencies
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { GetCryptoNewsParams, GetCryptoNewsResponse } from '../types/cryptoNewsApi';

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_BING_NEWS_API_KEY,
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string) => ({
  url,
  headers: cryptoNewsApiHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<GetCryptoNewsResponse, unknown>({
      query: ({
        newsCategory,
        count,
      }: GetCryptoNewsParams) => createRequest(`/news/search?q=${newsCategory}&count=${count}&safeSearch=Off&textFormat=Raw&freshness=Day`),
    }),
  }),
});

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;
