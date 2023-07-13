import { useDispatch } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppDispatch } from '../../store';
import { startLogout } from '../../store/auth/thunks';


export const NavBar = () => {

    const dispatch = useDispatch<AppDispatch>();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position='fixed'
            className='w-full'
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton
                        color='error'
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
