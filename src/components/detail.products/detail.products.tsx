'use client'
import Container from "@mui/material/Container"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import { addCommas, capitalizeFirstLetter, removeNonNumeric } from "@/utils/helper";
import "react-image-gallery/styles/css/image-gallery.css";
import './style.css'
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import Box from "@mui/material/Box";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/utils/styles";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ExtraInfo from "./extra.info";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface INav {
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
}

const LeftNav = (props: INav) => {
    const { onClick, disabled } = props
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '50%',
                position: 'absolute',
                top: '40%',
                left: '0',
                display: 'flex',
                height: '40px',
                minWidth: '40px',
                zIndex: 4000,
                alignItems: 'center',
                justifyContent: 'center',
                px: 0
            }}
                onClick={onClick} disabled={disabled} variant="contained" color="violet"><ArrowBackIosNewIcon /></Button>
        </ThemeProvider>
    );
}
const RightNav = (props: INav) => {
    const { onClick, disabled } = props
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '50%',
                position: 'absolute',
                top: '40%',
                right: '0',
                display: 'flex',
                height: '40px',
                minWidth: '40px',
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                px: 0
            }}
                onClick={onClick} disabled={disabled} variant="contained" color="violet"><ArrowForwardIosIcon /></Button>
        </ThemeProvider>
    );
}
interface IFull {
    onClick: React.MouseEventHandler<HTMLElement>, isFullscreen: boolean
}
const Fullscreen = (props: IFull) => {
    const { onClick, isFullscreen } = props
    return (
        <ThemeProvider theme={theme}>
            <Button sx={{
                borderRadius: '50%',
                position: 'absolute',
                bottom: '0',
                right: '0',
                display: 'flex',
                height: '40px',
                minWidth: '40px',
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                px: 0
            }}
                onClick={onClick} variant="contained" color="violet">{!isFullscreen ? <FullscreenIcon /> : <FullscreenExitIcon />}</Button>
        </ThemeProvider>
    );
}

interface IProps {
    data: null | IProducts
}
const DetailProducts = (props: IProps) => {
    const { data } = props;
    const [images, setImages] = React.useState<ReactImageGalleryItem[] | null>(null)
    const [quantity, setQuantity] = React.useState<number>(1)

    React.useEffect(() => {
        if (data?.images && data?.images.length > 0) {
            setImages(data.images.map((i) => {
                return {
                    original: i,
                    thumbnail: i,
                    originalHeight: 400,
                    originalWidth: 600
                }
            }))
        }
    }, [data])

    const calc = (sign: string) => {
        if (sign === 'increase') {
            setQuantity(prev => prev + 1)
        }
        else {
            if (sign === 'decrease') {
                if (quantity === 1) return
                setQuantity(prev => prev - 1)
            } else {
                if (!Number(sign)) { setQuantity(1) }
                else { setQuantity(+sign) }
            }
        }
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/" style={{ textDecoration: 'unset', color: 'unset' }}>
                    Home
                </Link>
                <Link
                    style={{ textDecoration: 'unset', color: 'unset' }}
                    href={`/collections/${data?.category.title.toLowerCase()}`}
                >
                    {capitalizeFirstLetter(data?.category.title || 'category')}
                </Link>
                <Typography color="text.primary">{data?.title || 'Product'}</Typography>
            </Breadcrumbs>
            <Box sx={{ mt: 2, display: 'flex' }}>
                <Box sx={{ width: '40%' }}>
                    <ImageGallery
                        renderLeftNav={(onClick, disabled) => (
                            <LeftNav onClick={onClick} disabled={disabled} />
                        )}
                        renderRightNav={(onClick, disabled) => (
                            <RightNav onClick={onClick} disabled={disabled} />
                        )}
                        renderFullscreenButton={(onClick, isFullscreen) => (
                            <Fullscreen onClick={onClick} isFullscreen={isFullscreen} />
                        )}
                        showPlayButton={false} items={images || []} />
                </Box>
                <Box sx={{ width: '60%', display: 'flex' }}>
                    <Box sx={{ width: '62.5%', pl: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography sx={{ fontSize: '35px', fontWeight: 500 }}>{addCommas(removeNonNumeric(data?.price ?? 0))} VND</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Rating sx={{ marginLeft: '-1px' }} size="medium" value={data?.totalRating ?? 0} readOnly />
                            <Typography color={"red"} fontStyle={"italic"}>Sold: {data?.sold}</Typography>
                        </Box>
                        <List>
                            {data?.description && data?.description.length > 0 && data?.description.map((item) => {
                                return (
                                    <Box key={item} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ListItemIcon sx={{ minWidth: '26px' }}><StopIcon fontSize="small" /></ListItemIcon>
                                        <ListItemText primary={item} />
                                    </Box>
                                )
                            })}
                        </List>
                        {data?.variants && data?.variants.length > 0 && data.variants.map((item, idx) => {
                            let [isChoose, setIsChoose] = React.useState(0)
                            const handleClick = (idx: number) => {
                                setIsChoose(idx)
                            }
                            return (
                                <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Typography sx={{ fontWeight: 500 }}>{item.label}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }} >
                                        {item.variants && item.variants.length > 0 && item.variants.map((value, idx) => {
                                            return (
                                                <ThemeProvider theme={theme}>
                                                    <Button onClick={() => { handleClick(idx) }} variant={isChoose === idx ? 'outlined' : 'text'} color="violet" key={value}>{value}</Button>
                                                </ThemeProvider>
                                            )
                                        })}
                                    </Box>
                                </Box>
                            )
                        })}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 500, textTransform: 'capitalize' }}>quantity</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                <ThemeProvider theme={theme}>
                                    <Button color="violet" onClick={() => { calc('decrease') }}><RemoveIcon fontSize="small" /></Button>
                                </ThemeProvider>
                                <TextField onChange={(e) => { calc(e.target.value) }} value={quantity} sx={{ maxWidth: '60px', '& .MuiInput-root .mui-1x51dt5-MuiInputBase-input-MuiInput-input': { textAlign: 'center' } }} variant="standard" />
                                <ThemeProvider theme={theme}>
                                    <Button color="violet" onClick={() => { calc('increase') }}><AddIcon fontSize="small" /></Button>
                                </ThemeProvider>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <ThemeProvider theme={theme}>
                                <Button sx={{ width: '100%' }} color="violet" variant="contained" onClick={() => { console.log('hi') }}>Add to cart</Button>
                            </ThemeProvider>
                        </Box>
                    </Box>
                    <Box sx={{ width: "37.5%" }}>
                        <ExtraInfo />
                    </Box>
                </Box>

            </Box>
        </Container>
    )
}
export default DetailProducts