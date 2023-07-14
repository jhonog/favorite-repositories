import { Dispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { LoginData, SiginUpData } from "../../auth/models";
import {
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    logoutFirebase,
} from "../../firebase/providers";
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { setTemporalDisplayName } from "../favoriteRepos";

// Async function to controls the auth status
export const checkingAuthentication = () => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

    }
}

// Async funtion to controls the redux store auth data when an account is register
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: SiginUpData) => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        if (!result.ok) return dispatch(logout(result));

        const favorite = {
            favorite: []
        }

        const newDoc = doc(collection(FirebaseDB, `${result.uid}/repositories/favorite`));
        await setDoc(newDoc, favorite);

        dispatch(login(result))

    }

}

// Async funtion to controls the redux store auth data when an account is loged
export const startLoginWithEmailPassword = ({ email, password }: LoginData) => {
    return async (dispatch: Dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));

    }
}

// Async funtion to controls the redux store auth data when logout
export const startLogout = (error?: any) => {
    return async (dispatch: Dispatch) => {
        await logoutFirebase();
        dispatch(setTemporalDisplayName(null));
        dispatch(logout(error));
    };
};
