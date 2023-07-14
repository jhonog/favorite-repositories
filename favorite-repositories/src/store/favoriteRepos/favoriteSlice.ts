import { createSlice } from "@reduxjs/toolkit"

export interface FavoriteState {
    isSaving: boolean;
    favoriteRepositories: number[];
    userData: any,
    temporalDisplayName: string
    id: string;
}

const initialState: FavoriteState = {
    isSaving: false,
    favoriteRepositories: [],
    userData: {},
    temporalDisplayName: '',
    id: ''
}

// Slice to controls the global favorite repository state 
export const favoriteSlice = createSlice({
    name: 'favoriteRepos',
    initialState,
    reducers: {
        setFavorite: (state, action) => {
            action.payload?.favorite ?
                state.favoriteRepositories = action.payload?.favorite
                : state.favoriteRepositories = action.payload?.favorite;
            state.id = action.payload?.id
        },
        setCurrentFavorite: (state, action) => {
            state.favoriteRepositories = action.payload;
            state.isSaving = false;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isSaving = false;
        },
        setSaving: (state) => {
            state.isSaving = true;
        },
        setTemporalDisplayName: (state, action) => {
            state.temporalDisplayName = action.payload;
        },
        updateFavorite: (state, action) => { // payload: note
            state.isSaving = false;
            state.favoriteRepositories = state.favoriteRepositories.map(repositorie => {

                if (repositorie === action.payload) {
                    return action.payload;
                }

                return repositorie;
            });
        },
    }
})

// Action creators are generated for each case reducer function
export const { setFavorite, setSaving, updateFavorite, setCurrentFavorite, setUserData, setTemporalDisplayName } = favoriteSlice.actions;
