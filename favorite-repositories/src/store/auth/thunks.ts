import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { LoginData, SiginUpData } from "../../auth/models";
import {
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    logoutFirebase,
} from "../../firebase/providers";

export const checkingAuthentication = () => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: SiginUpData) => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))

    }

}

export const startLoginWithEmailPassword = ({ email, password }: LoginData) => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));

    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        await logoutFirebase();

        dispatch(logout({}));
    };
};
