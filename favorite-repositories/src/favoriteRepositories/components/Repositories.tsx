import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { startSaveFavorite } from '../../store/favoriteRepos';

interface RepositoriesProps {
    Repositories: any[];
    searchTerm: string;
    favoriteRepositories: number[];
}

export const Repositories = ({ Repositories, searchTerm, favoriteRepositories }: RepositoriesProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const filteredList = Repositories.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onClickAddFavorite = (id: number) => {
        dispatch(startSaveFavorite(id))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
                {filteredList.map((repository) => (
                    <div
                        key={repository.id}
                        className="bg-white p-4 shadow-md rounded-md flex items-center justify-between"
                    >
                        <Typography variant="body1">{repository.name}</Typography>
                        <IconButton
                            onClick={() => onClickAddFavorite(repository.id)}
                        >
                            {
                                favoriteRepositories?.find(favorite => repository.id == favorite) ? (
                                    <Favorite color='primary' />
                                ) :
                                    (
                                        <FavoriteBorder color='primary' />
                                    )
                            }
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    )
}
