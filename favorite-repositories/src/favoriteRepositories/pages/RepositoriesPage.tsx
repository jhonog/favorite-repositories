import { useUserRepositories } from '../../hooks/useUserRepositories';
import { useState, ChangeEvent } from 'react';
import { TextField, Box, Typography, IconButton } from '@mui/material';
import { Search, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { FavoriteLayout } from '../layout/ReposLayout';
import { Repositories } from '../components';

export const RepositoriesPage = () => {

    const { favoriteRepositories } = useSelector((state: RootState) => state.favorite);

    const { userRepositories } = useUserRepositories();

    const [searchTerm, setSearchTerm] = useState('');

    const [isFavorite, setIsFavorite] = useState(false);

    const favorites = userRepositories.filter((repository) =>
        favoriteRepositories?.includes(repository.id)
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (

        <FavoriteLayout>
            <Box className="container mx-auto px-4 py-8 h-full">
                <Box sx={{ marginBottom: 4 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: <Search />,
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton
                        disabled={favoriteRepositories?.length <= 0}
                        color='secondary'
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {
                            isFavorite ?
                                (
                                    <Favorite color='primary' />
                                ) :
                                (
                                    <FavoriteBorder color='primary' />
                                )
                        }
                    </IconButton>
                    <Typography>Favorites ({favoriteRepositories?.length})</Typography>
                </Box>
                {isFavorite && favoriteRepositories.length > 0 ? (
                    <Repositories Repositories={favorites} searchTerm={searchTerm} favoriteRepositories={favoriteRepositories} />

                ) : (
                    <Repositories Repositories={userRepositories} searchTerm={searchTerm} favoriteRepositories={favoriteRepositories} />

                )}
            </Box>


        </FavoriteLayout>

    );
}
