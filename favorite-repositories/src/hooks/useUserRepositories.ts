import { useDispatch, useSelector } from "react-redux";
import { gitHubApi } from "../api/gitHubApi";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { startUserData } from "../store/favoriteRepos";
import { startLogout } from "../store/auth";


export const useUserRepositories = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { displayName } = useSelector((state: RootState) => state.auth);
    const { temporalDisplayName } = useSelector((state: RootState) => state.favorite);

    const [isLoading, setIsLoading] = useState(true)

    const [userRepositories, setUserRepositories] = useState<any[]>([]);

    // Get the user data using the username
    const getUserRepositories = async () => {
        try {

            const repositories = gitHubApi.get<any>(`/${temporalDisplayName ? temporalDisplayName : displayName}/repos`);

            const userRepositoriesResps = await Promise.resolve(
                repositories,
            );

            setUserRepositories(userRepositoriesResps.data)

            setIsLoading(false)
        } catch (error) {
            dispatch(startLogout({ errorMessage: 'An error has occurred' }))
        }
    }

    useEffect(() => {
        dispatch(startUserData(temporalDisplayName ? temporalDisplayName : displayName));
        getUserRepositories();
    }, [])

    return { userRepositories, isLoading }
}
