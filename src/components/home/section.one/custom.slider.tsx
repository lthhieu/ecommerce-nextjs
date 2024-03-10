'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/utils/styles";
const SampleNextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '100%',
                position: 'absolute',
                top: '45%',
                right: '-2%',
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
                left: '-2%',
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
const CustomSlider = () => {
    const settings: Settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    return (
        <Slider {...settings}>
            <Box sx={{ width: '100%', height: { xs: '250px', md: '490px' } }}>
                <Box sx={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url('https://digital-world-2.myshopify.com/cdn/shop/files/slideshow3-home2_1920x.jpg?v=1613166679')`, height: '100%' }}></Box>
            </Box>
            <Box sx={{ width: '100%', height: { xs: '250px', md: '490px' } }}>
                <Box sx={{ width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center', backgroundImage: `url('https://digital-world-2.myshopify.com/cdn/shop/files/slideshow3-home2_1920x.jpg?v=1613166679')`, height: '100%' }}></Box>
            </Box>
        </Slider>
    )
}
export default CustomSlider