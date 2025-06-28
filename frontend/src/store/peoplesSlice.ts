import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TPeople } from "../validation-schemas/people.schema"

export interface PeoplesState {
  list: TPeople[]
}

const initialState: PeoplesState = { list: [] }

const peoplesSlice = createSlice({
  name: "peoples",
  initialState,
  reducers: {
    setPeoples(state, action: PayloadAction<TPeople[]>) {
      state.list = action.payload
    },
  },
})

export const { setPeoples } = peoplesSlice.actions
export default peoplesSlice.reducer
