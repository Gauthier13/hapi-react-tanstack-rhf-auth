import { configureStore } from "@reduxjs/toolkit"
import filmsReducer from "./filmsSlice"
import planetsReducer from "./planetsSlice"
import peoplesReducer from "./peoplesSlice"
import speciesReducer from "./speciesSlice"
import starshipsReducer from "./starshipsSlice"

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    planets: planetsReducer,
    peoples: peoplesReducer,
    species: speciesReducer,
    starships: starshipsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
