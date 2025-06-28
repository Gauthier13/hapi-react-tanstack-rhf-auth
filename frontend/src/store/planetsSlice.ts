import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TPlanet } from "../validation-schemas/planet.shema"

export interface PlanetsState {
  list: TPlanet[]
}

const initialState: PlanetsState = { list: [] }

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPlanets(state, action: PayloadAction<TPlanet[]>) {
      state.list = action.payload
    },
  },
})

export const { setPlanets } = planetsSlice.actions
export default planetsSlice.reducer
