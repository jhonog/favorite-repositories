import { useState } from 'react';
import { useDispatch } from "react-redux";
import { gitHubApi } from "../api/gitHubApi";
import { AppDispatch } from "../store";
import { startLogout } from "../store/auth";


export const useVerifyRepository = () => {

    const dispatch = useDispatch<AppDispatch>();

    const [isValid, setIsValid] = useState(false);

    // Get the user data using the username
    const verifyRepository = async (displayName: string) => {
        try {
            const verify = gitHubApi.get<any>(`/${displayName}`);
            const userRepositoriesResps = await Promise.resolve(
                verify,
            );
            if (userRepositoriesResps) {
                setIsValid(true)
            }
            // return true
        } catch (error) {
            dispatch(startLogout({ errorMessage: 'You cant sign up because the username doesnt exist on GitHub' }));
            setIsValid(false)
        }
    }

    return { verifyRepository, isValid }
}
