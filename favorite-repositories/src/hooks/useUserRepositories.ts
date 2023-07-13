import { useSelector } from "react-redux";
import { gitHubApi } from "../api/gitHubApi";
import { RootState } from "../store";
import { useEffect, useState } from "react";

interface UserRespositories {
    userData: any,
    repositories: any[],
    isLoading: boolean
}

export const useUserRepositories = () => {
    const { displayName } = useSelector((state: RootState) => state.auth);

    const [userRepositories, setUserRepositories] = useState<UserRespositories>({
        userData: {},
        repositories: [],
        isLoading: true,
    })

    const getUserRepositories = async () => {
        const userData = gitHubApi.get<any>(`/${displayName}`);
        const repositories = gitHubApi.get<any>(`/${displayName}/repos`);

        const userRepositoriesResps = await Promise.all([
            userData,
            repositories,
        ]);

        setUserRepositories({
            userData: userRepositoriesResps[0]?.data,
            repositories: userRepositoriesResps[1]?.data.map((repository: any) => {
                return {
                    name: repository.name
                }
            }),
            isLoading: false
        })
    }

    useEffect(() => {
        getUserRepositories();
    }, [])

    return { ...userRepositories }
}
