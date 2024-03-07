'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const SampleNextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <Button sx={{
            position: 'absolute',
            top: '40%',
            right: '-2%',
            display: 'flex',
            height: '40px',
            minWidth: '40px',
            zIndex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            px: 0
        }}
            onClick={onClick} variant="outlined"><ArrowForwardIosIcon /></Button>
    );
}

const SamplePrevArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <Button sx={{
            position: 'absolute',
            top: '40%',
            left: '-2%',
            display: 'flex',
            height: '40px',
            minWidth: '40px',
            zIndex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            px: 0
        }}
            onClick={onClick} variant="outlined"><ArrowBackIosNewIcon /></Button>
    );
}
const CustomSlider = () => {
    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return (
        <Slider {...settings}>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
            <Box>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: '5px' }}>
                    <Box sx={{ width: '100%', border: '1px solid gray', height: '100%' }}>1</Box>
                </Box>
            </Box>
        </Slider>
    )
}
export default CustomSlider