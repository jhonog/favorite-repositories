import { Box } from '@mui/material';
import { ReactNode } from 'react';
import ImageLogos from "../../assets/images/personaje_logos.png";
import Logo from "../../assets/images/Logo-Favorite-repositories.png";
import { AppThemeDark } from '../../theme';

type AuthLayoutProps = {
    children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <AppThemeDark>
            <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#1F2D48' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }} className='w-full md:w-1/2'>
                    <img src={Logo} className='h-20 w-52 mb-8' />
                    {children}
                </Box>

                <Box sx={{ justifyContent: 'center', alignItems: 'center', padding: '2.5rem' }} className='hidden md:flex  w-1/2'>
                    <img src={ImageLogos} alt="" />
                </Box>

            </Box>
        </AppThemeDark>

    )
}
