import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { weddingAPI } from './services/api'
import weddingReducer from '@/features/wedding/slice'

export const store = configureStore({
  reducer: {
    [weddingAPI.reducerPath]: weddingAPI.reducer,
    wedding: weddingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weddingAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
