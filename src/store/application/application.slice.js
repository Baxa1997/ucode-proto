import { createSlice } from "@reduxjs/toolkit"

export const {
  actions: applicationActions,
  reducer: applicationReducer
} = createSlice({
  name: "application",
  initialState: {
    list: [],
    loader: false,
  },
  reducers: {
    setList: (state, {payload}) => {
      state.list = payload ?? []
    },
    add: (state, { payload }) => {
      state.list.unshift(payload)
    },
    setDataById: (state, { payload }) => {
      const index = state.list.findIndex(item => item.id === payload.id)
      state.list[index] = payload
    },
    delete: (state, { payload }) => {
      const index = state.list.findIndex(item => item.id === payload)
      state.list.splice(index, 1)
    },
    setLoader: (state, { payload }) => {
      state.loader = payload
    }
  },
})