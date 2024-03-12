'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ThemeProvider } from '@mui/material/styles';
import Image from "next/image";
import { addCommas, removeNonNumeric } from "@/utils/helper";
import Rating from '@mui/material/Rating';
import { theme } from "@/utils/styles";
import Link from "next/link";
const SampleNextArrow = (props: CustomArrowProps) => {
    const { onClick } = props;
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '50%',
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
                borderRadius: '50%',
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
                        <Link style={{ textDecoration: 'unset', color: 'unset' }} href={`/collections/${item.category.title.toLowerCase()}/products/${item.slug}_${item._id}.html`}>
                            <Box sx={{ marginLeft: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Box sx={{ marginTop: 1 }}>
                                    <Image src={item.thumb} alt="image" width={250} height={250} style={{ objectFit: 'contain' }} />
                                </Box>
                                <Box sx={{ paddingX: 2, paddingBottom: 2, width: 1 }}>
                                    <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight={500} fontSize={17}>{item.title}</Typography>
                                    <Rating sx={{ marginLeft: '-1px' }} size="small" name="read-only" value={item.totalRating} readOnly />
                                    <Typography>{addCommas(removeNonNumeric(item.price))} VND</Typography>
                                </Box>
                            </Box>
                        </Link>
                    </Box>
                )
            })}
        </Slider>
    )
}
export default CustomSlider