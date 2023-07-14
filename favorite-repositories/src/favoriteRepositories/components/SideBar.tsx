import { Avatar, Box, Drawer, Link, Typography } from '@mui/material'
import { GitHub } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


interface SideBarProps {
    drawerWidth: number
}

export const SideBar = ({ drawerWidth = 240 }: SideBarProps) => {

    const { displayName } = useSelector((state: RootState) => state.auth);
    const { userData } = useSelector((state: RootState) => state.favorite);

    return (

        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth } }}
            className='hidden sm:flex'
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{

                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: drawerWidth, display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}
            >
                <Avatar sx={{ width: 150, height: 150, marginBottom: '1.5rem' }} src={userData?.avatar_url} />

                <Typography
                    fontSize='large'
                    sx={{ display: 'flex', justifyContent: 'center', color: '#fff', marginBottom: 1 }}>
                    <GitHub sx={{ marginRight: 0.8 }} />{displayName}
                </Typography>

                <Typography fontSize='large'>
                    <Link target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }} href={userData?.html_url} >
                        {userData?.html_url}
                    </Link>
                </Typography>
            </Drawer>

        </Box>

    )
}
