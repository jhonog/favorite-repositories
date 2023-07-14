import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleThemeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6C42D9'
        },
        secondary: {
            main: '#fff'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#364761', // Color de fondo de la tarjeta
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#364761',
                    borderTopLeftRadius: '4rem',
                    borderBottomRightRadius: '4rem',
                    padding: '2rem'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                }
            }
        }
    }
})





