import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TSpecies } from "../validation-schemas/species.schema"

export interface SpeciesState {
  list: TSpecies[]
}

const initialState: SpeciesState = { list: [] }

const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {
    setSpecies(state, action: PayloadAction<TSpecies[]>) {
      state.list = action.payload
    },
  },
})

export const { setSpecies } = speciesSlice.actions
export default speciesSlice.reducer
