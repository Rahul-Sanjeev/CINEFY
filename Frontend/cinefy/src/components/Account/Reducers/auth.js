import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL
} from '../Actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    // loading: true,
    // error: null
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                access: payload.access,
                refresh: payload.refresh,
                isAuthenticated: true,
                user: payload.user,
                // loading: false,
                // error: null
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                // loading: false,
                // error: payload
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                // loading: false,
                // error: null
            }
        case USER_LOADED_FAIL:
    }
}