import { ReactNode } from 'react';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar, SideBar } from '../components';
import { AppTheme } from '../../theme';



type FavoriteLayoutProps = {
    children: ReactNode;
};

const drawerWidth = 280;

export const FavoriteLayout = ({ children }: FavoriteLayoutProps) => {
    return (
        <AppTheme>
            <Box sx={{ display: 'flex', backgroundColor: '#fff', height: 'max-content' }}>

                <NavBar drawerWidth={drawerWidth} />

                <SideBar drawerWidth={drawerWidth} />

                <Box
                    component='main'
                    sx={{ flexGrow: 1, p: 3, height: '100%', backgroundColor: '#ffffff' }}
                >
                    <Toolbar />

                    {children}

                </Box>
            </Box>
        </AppTheme>
    )
}
