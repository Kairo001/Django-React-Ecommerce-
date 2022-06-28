import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  alert: null
}

export const  alertSlice = createSlice({
  name:'alert',
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload
    },
    removeAlert(state, action) {
      state.alert = null
    }
  }
})

export const { setAlert, removeAlert } = alertSlice.actions

export default alertSlice.reducer

export const setAlertAction = (msg, alertType, timeOut = 15000) => dispatch => {
  dispatch(setAlert({msg, alertType}))

  setTimeout(() => dispatch(removeAlert()), timeOut)
}