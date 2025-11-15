import { configureStore } from "@reduxjs/toolkit"
import adsSlice from "@/shared/slices/adsSlice"

export const store = configureStore({
  reducer: {
    ads: adsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch