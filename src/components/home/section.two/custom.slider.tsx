'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    createTheme,
    ThemeProvider,
    alpha,
    getContrastRatio,
} from '@mui/material/styles';
import Image from "next/image";
import { addCommas, convertNumberToList, removeNonNumeric } from "@/utils/helper";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
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
const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});
const SampleNextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '100%',
                position: 'absolute',
                top: '45%',
                right: '-1%',
                display: 'flex',
                height: '40px',
                minWidth: '40px',
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                px: 0
            }}
                onClick={onClick} variant="contained" color="violet"><ArrowForwardIosIcon /></Button>
        </ThemeProvider>
    );
}

const SamplePrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '100%',
                position: 'absolute',
                top: '45%',
                left: '-1%',
                display: 'flex',
                height: '40px',
                minWidth: '40px',
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                px: 0
            }}
                onClick={onClick} variant="contained" color="violet"><ArrowBackIosNewIcon /></Button>
        </ThemeProvider>
    );
}
interface IProps {
    data: IProducts[] | []
}
const CustomSlider = (props: IProps) => {
    const { data } = props;
    const settings: Settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1110,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <Slider {...settings}>
            {data.length > 0 && data.map((item) => {
                return (
                    <Box key={item._id} sx={{ marginLeft: -1, marginTop: 2 }}>
                        <Box sx={{ marginLeft: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Box sx={{ marginTop: 1 }}>
                                <Image src={item.thumb} alt="image" width={250} height={250} style={{ objectFit: 'contain' }} />
                            </Box>
                            <Box sx={{ paddingLeft: 2, paddingBottom: 2, width: '100%' }}>
                                <Typography fontWeight={500} fontSize={17}>{item.title}</Typography>
                                <Typography>{convertNumberToList(item.totalRating).map((value, index) => {
                                    return (
                                        <Typography component={'span'} sx={{ color: '#ffb400', marginLeft: '-1px' }} key={index} >
                                            {value === 1 ? <StarIcon sx={{ fontSize: "18px" }} /> : value === 0 ? <StarBorderIcon sx={{ fontSize: "18px" }} /> : <StarHalfIcon sx={{ fontSize: "18px" }} />}
                                        </Typography>
                                    )
                                })}</Typography>
                                <Typography>{addCommas(removeNonNumeric(item.price))} VND</Typography>
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Slider>
    )
}
export default CustomSlider