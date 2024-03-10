// https://mui.com/material-ui/customization/palette/
import { createTheme, alpha, getContrastRatio, } from '@mui/material/styles';
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
                    height: 3,
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