import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TStarship } from "../validation-schemas/starship.schema"

export interface StarshipsState {
  list: TStarship[]
}

const initialState: StarshipsState = { list: [] }

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    setStarships(state, action: PayloadAction<TStarship[]>) {
      state.list = action.payload
    },
  },
})

export const { setStarships } = starshipsSlice.actions
export default starshipsSlice.reducer
