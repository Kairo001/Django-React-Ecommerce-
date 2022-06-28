import { createSlice } from '@reduxjs/toolkit'

import { setAlertAction } from '../alert'

import axios from 'axios'

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cualquierMaricada(state, action) {
      // Reducer para manejar la acción de signup success, signup fail, login fail
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      state.access = null
      state.refresh = null
      state.isAuthenticated = false
      state.user = null
    },
    setAuthLoading(state, action) {
      // Reducer para activar el estado cargando
      state.loading = true
    },
    removeAuthLoading(state, action) {
      // Reducer para desactivar el estado cargando
      state.loading = false
    },
    cualquierMaricada2(state, action) {
      // Reducer que no cambia el estado
    },
    login(state, action) {
      localStorage.setItem('access',action.payload.access)
      localStorage.setItem('refresh',action.payload.refresh)
      state.isAuthenticated = true
      state.access = localStorage.getItem('access')
      state.refresh = localStorage.getItem('refresh')
    }
  }
})

export const { cualquierMaricada, setAuthLoading, removeAuthLoading, cualquierMaricada2, login } = userSlice.actions

export default userSlice.reducer

export const postSignUp = (first_name, last_name, email, password, re_password) => async dispatch => {

  dispatch(setAuthLoading())

  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password
  })

  try {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

    if(res.status === 201){
        dispatch(cualquierMaricada())
        dispatch(setAlertAction('Te hemos enviado un correo, por favor revísalo para poder activar tu cuenta.','green'))
    } else {
        dispatch(cualquierMaricada())
        dispatch(setAlertAction('Error al crear la cuenta.','red'))
    }

    dispatch(removeAuthLoading())

  } catch (err) {
    dispatch(cualquierMaricada())
    dispatch(removeAuthLoading())
    if(err.response) {
      if (err.response.status === 400) {
        if (Object.keys(err.response.data).includes('email')) {
          dispatch(setAlertAction('Ya existe una cuenta con este correo electrónico.','red'))
        } else if (Object.keys(err.response.data).includes('non_field_errors')){
          dispatch(setAlertAction('Las contraseñas no coinciden, por favor vuelve a intentarlo.','red'))
        } else {
          dispatch(setAlertAction('Error conectando con el servidor, por favor intenta más tarde.','red'))
        }
      }
    } else {
      dispatch(setAlertAction('Error conectando con el servidor, por favor intenta más tarde.','red'))
    }
  }
}

export const getUser = () => async dispatch => {
  if(localStorage.getItem('access')) {
    const config = {
      headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
      }
    }
  }
}

export const postLogin = (email, password) => async dispatch => {
  dispatch(setAuthLoading())

  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    email,
    password
  })

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

    if (res.status === 200){
      dispatch(login(res.data))
      dispatch(removeAuthLoading())
      dispatch(setAlertAction('Inicio de sesión con éxito.', 'green'))
    } else {
      dispatch(cualquierMaricada())
      dispatch(removeAuthLoading())
      dispatch(setAlertAction('Ocurrió un error al iniciar sesión.', 'green'))
    }
  } catch (error) {
    dispatch(cualquierMaricada())
    dispatch(removeAuthLoading())
    if (error.response) {
      if(Object.keys(error.response.data).includes("detail")) {
        dispatch(setAlertAction("Nombre o contraseña incorrecta, o la cuenta aún no está activa.", "red"))
      } else {
        dispatch(setAlertAction("Error al iniciar sesión, por favor inteta más tarde.", "red"))
      }
    } else {
      dispatch(setAlertAction("Error al iniciar sesión, por favor inteta más tarde.", "red"))
    }
  }
    
}

export const activate = (uid, token) => async dispatch => {

  dispatch(setAuthLoading())

  const config = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    uid,
    token
  })

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

    if (res.status === 204) {
      dispatch(cualquierMaricada2())
      dispatch(setAlertAction('Tu cuenta ha sido activada correctamente.','green'))
    } else {
      dispatch(cualquierMaricada2())
      dispatch(setAlertAction('Error al activar la cuenta.','red'))
    }
    dispatch(removeAuthLoading())

  } catch (error) {
    dispatch(cualquierMaricada())
    dispatch(removeAuthLoading())
    dispatch(setAlertAction('Error conectando con el servidor, por favor intenta más tarde.','red'))
  }
}