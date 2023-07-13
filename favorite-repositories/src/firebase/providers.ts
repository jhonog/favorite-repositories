import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { LoginData, SiginUpData } from '../auth/models';

export const registerUserWithEmailPassword = async ({ email, password, displayName }: SiginUpData) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid } = resp.user;

        FirebaseAuth.currentUser && await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, email, displayName
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error?.message }
    }

}


export const loginWithEmailPassword = async ({ email, password }: LoginData) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName } = resp.user;

        return {
            ok: true,
            uid, displayName, email
        }

    } catch (error: any) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}



