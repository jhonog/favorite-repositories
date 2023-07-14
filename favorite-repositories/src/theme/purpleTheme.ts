import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#6C42D9'
        },
        secondary: {
            main: '#1F2D48'
        },
        error: {
            main: red.A400
        },
        background: {
            default: '#fff', // Color de fondo de la tarjeta
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
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1F2D48',
                }
            }
        },
    }
})





