import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products?limit=0",
    }),
    searchProducts: builder.query({
      query: (query) => `products/search?q=${query}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useSearchProductsQuery } = api;
