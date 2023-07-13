import { createSlice } from "@reduxjs/toolkit"

export interface loginState {
    status: string,
    uid: string,
    email: string,
    displayName: string,
    errorMessage: string,
}

const initialState: loginState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: '',
    email: '',
    displayName: '',
    errorMessage: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.errorMessage = '';
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = '';
            state.email = '';
            state.displayName = '';
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
