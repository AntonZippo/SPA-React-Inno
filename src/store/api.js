import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ limit = 0, skip = 0 }) =>
        `products?limit=${limit}&skip=${skip}`,
    }),
    searchProducts: builder.query({
      query: ({ query, limit = 0, skip = 0 }) =>
        `products/search?q=${query}&limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useSearchProductsQuery } = api;
