import { configureStore } from "@reduxjs/toolkit"
import filmsReducer from "./filmsSlice"
import planetsReducer from "./planetsSlice"

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    planets: planetsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
