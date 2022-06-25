import { createSlice } from '@reduxjs/toolkit'

// Axios
import axios from 'axios'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cualquierMaricada(state, action) {
            // Reducer para manejar la acción de signup success, signup fail
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.access = null
            state.refresh = null
            state.isAuthenticated = false
            state.user = null
        },
        removeAuthLoading(state, action) {

        },
    }
})

export const { cualquierMaricada } = userSlice.actions

export default userSlice.reducer

export const postSignUp = (first_name, last_name, email, password, re_password) => async dispatch => {

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
            dispatch(cualquierMaricada(res.data))
        } else {
            dispatch(cualquierMaricada())
        }

    } catch (err) {
        dispatch(cualquierMaricada())
    }
}
