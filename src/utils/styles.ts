// https://mui.com/material-ui/customization/palette/
import { createTheme, alpha, getContrastRatio, } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
// Augment the palette to include a violet color
declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}
// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        violet: true;
    }
}

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
export const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        }
    }
});

export const theme1 = createTheme({
    components: {
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#7F00FF',
                    height: 2,
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: '#7F00FF'
                    }
                }
            }
        }
    },
});

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#7F00FF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#7F00FF',
        },
    },
});