import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TFilm } from "../validation-schemas/film.schema"

export interface FilmsState {
  list: TFilm[]
}

const initialState: FilmsState = { list: [] }

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setFilms(state, action: PayloadAction<TFilm[]>) {
      state.list = action.payload
    },
  },
})

export const { setFilms } = filmsSlice.actions
export default filmsSlice.reducer
