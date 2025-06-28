import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TVehicle } from "../validation-schemas/vehicle.schema"

export interface VehiculesState {
  list: TVehicle[]
}

const initialState: VehiculesState = { list: [] }

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles(state, action: PayloadAction<TVehicle[]>) {
      state.list = action.payload
    },
  },
})

export const { setVehicles } = vehiclesSlice.actions
export default vehiclesSlice.reducer
