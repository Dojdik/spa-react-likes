import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../reducers/posts/postsReducer'
import { postsApi } from '../api/posts'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer, 
  },
  middleware: (getDefaultMiddware) => {
    return getDefaultMiddware().concat(postsApi.middleware)
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch