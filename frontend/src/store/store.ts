import { configureStore } from "@reduxjs/toolkit"
import filmsReducer from "./filmsSlice"
import planetsReducer from "./planetsSlice"
import peoplesReducer from "./peoplesSlice"
import speciesReducer from "./speciesSlice"

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    planets: planetsReducer,
    peoples: peoplesReducer,
    species: speciesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
