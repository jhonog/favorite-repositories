import { doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '..';
import { loadFavorite } from '../../helpers/loadFavorite';
import { setCurrentFavorite, setFavorite, setSaving, setUserData } from '.';
import { gitHubApi } from '../../api/gitHubApi';

// Async function to load the users favorite repositories
export const startUserData = (displayName: string) => {
    return async (dispatch: Dispatch) => {

        try {
            const userData = gitHubApi.get<any>(`/${displayName}`);

            const userDataResp = await Promise.resolve(userData);

            dispatch(setUserData(userDataResp.data));

        } catch (error) {
            throw new Error('An error has occurred');
        }
    }
}


// Async function to load the users favorite repositories
export const startLoadingFavorite = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        if (!uid) throw new Error('The users UID doesnt exist');

        const favoriteRepositories: FavoriteRepositories = await loadFavorite(uid);
        dispatch(setFavorite(favoriteRepositories));
    }
}

// Async function to update the users favorite repositories
export const startSaveFavorite = (idRepository: number) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { id, favoriteRepositories } = getState().favorite;

        const newFavoriteRepositories = favoriteRepositories?.find(repository => repository == idRepository) ?
            favoriteRepositories.filter((repository) => repository !== idRepository) :
            [idRepository, ...favoriteRepositories]

        const docRef = doc(FirebaseDB, `${uid}/repositories/favorite/${id}`);
        await setDoc(docRef, { favorite: newFavoriteRepositories }, { merge: true });

        dispatch(setCurrentFavorite(newFavoriteRepositories));

    }
}