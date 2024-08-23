// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config'

type ApiResponse = {
  data: string[]
}

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.apiEndpoint }),
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse, number>({
      query: (count) => `/?count=${count}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery } = postsApi