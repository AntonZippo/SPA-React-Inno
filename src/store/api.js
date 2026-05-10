import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ limit = 12, skip = 0 }) =>
        `products?limit=${limit}&skip=${skip}`,
    }),
    searchProducts: builder.query({
      query: ({ query, limit = 12, skip = 0 }) =>
        `products/search?q=${query}&limit=${limit}&skip=${skip}`,
    }),
    getProductsByCategory: builder.query({
      query: ({ category, limit = 12, skip = 0 }) =>
        `products/category/${category}?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = api;
