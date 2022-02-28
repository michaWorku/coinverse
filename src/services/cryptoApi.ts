// Dependencies
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  GetCoinHistoryResponse,
  GetCoinResponse,
  GetCoinsResponse,
  GetCryptoHistoryParams,
  GetExchangesResponse,
  GetGlobalStatsResponse,
} from '../types/cryptoApi';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_COIN_RANKING_API_KEY,
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getStats: builder.query<GetGlobalStatsResponse, void>({
      query: () => createRequest('/stats'),
    }),
    getCryptos: builder.query<GetCoinsResponse, number | string>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<GetCoinResponse, number | string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<GetCoinHistoryResponse, GetCryptoHistoryParams>({
      query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getExchanges: builder.query<GetExchangesResponse, void>({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
