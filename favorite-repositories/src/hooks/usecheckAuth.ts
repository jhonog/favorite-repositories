import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingFavorite } from '../store/favoriteRepos';

// Custom Hook to check the user auth status
export const usecheckAuth = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { status } = useSelector((state: RootState) => state.auth);

    useEffect(() => {

        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout({}));

            const { uid, email, displayName } = user;
            dispatch(login({ uid, email, displayName }));
            dispatch(startLoadingFavorite());

        })
    }, []);

    return status;
}
