import { configureStore } from "@reduxjs/toolkit"
import filmsReducer from "./filmsSlice"
import planetsReducer from "./planetsSlice"
import peoplesReducer from "./peoplesSlice"

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    planets: planetsReducer,
    peoples: peoplesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
