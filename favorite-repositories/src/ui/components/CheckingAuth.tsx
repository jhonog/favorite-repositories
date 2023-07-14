import { Box, CircularProgress } from '@mui/material';
import { AppTheme } from '../../theme';

export const CheckingAuth = () => {
  return (
    <AppTheme>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1F2D48' }}>

        <CircularProgress color="primary" />

      </Box>

    </AppTheme>
  )
}
