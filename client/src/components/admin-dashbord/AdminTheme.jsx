import { createTheme } from '@mui/material/styles';

const AdminTheme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Green
        },
        secondary: {
            main: '#FFC107', // Yellow
        },
        background: {
            default: '#F5F5F5', // Light gray
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
    },
});

export default AdminTheme;
