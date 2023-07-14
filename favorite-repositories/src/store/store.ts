import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { favoriteSlice } from './favoriteRepos'

// The Redux store to controls the application global state  
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        favorite: favoriteSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch