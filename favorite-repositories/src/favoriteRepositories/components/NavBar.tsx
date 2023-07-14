import { useDispatch } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { AppDispatch } from '../../store';
import { startLogout } from '../../store/auth/thunks';
import Logo from "../../assets/images/Logo-Favorite-repositories-oscuro.png";

interface NavBarProps {
    drawerWidth: number
}

export const NavBar = ({ drawerWidth = 240 }: NavBarProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: '#fff'
            }}
        >
            <Toolbar>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <img src={Logo} className='h-16' />

                    <IconButton
                        color='primary'
                        onClick={onLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
