import { useUserRepositories } from '../../hooks/useUserRepositories';
import { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Grid, Box, Typography, IconButton } from '@mui/material';
import { Search, StarBorderOutlined } from '@mui/icons-material';
import { NavBar } from '../components/NavBar';

interface ListItem {
    id: number;
    name: string;
    favorite: boolean;
}

export const RepositoriesPage = () => {
    const { userData, repositories, isLoading } = useUserRepositories();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // const handleFavoriteToggle = (id: number) => {
    //     setList((prevList) =>
    //         prevList.map((item) =>
    //             item.id === id ? { ...item, favorite: !item.favorite } : item
    //         )
    //     );
    // };

    const filteredList = repositories.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <NavBar />
            {
                isLoading ? (
                    <div>Cargando</div>
                ) : (
                    <div className="container mx-auto px-4 py-8">
                        <div className="mb-4">
                            <TextField
                                fullWidth
                                placeholder="Buscar por nombre"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: <Search />,
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            {filteredList.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 shadow-md rounded-md flex items-center justify-between"
                                >
                                    <Typography variant="body1">{item.name}</Typography>
                                    <IconButton
                                        // onClick={() => handleFavoriteToggle(item.id)}
                                        color={item.favorite ? 'secondary' : 'default'}
                                    >
                                        <StarBorderOutlined />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>

    );
}
