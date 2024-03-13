'use client'
import Container from "@mui/material/Container"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/helper";
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
                    <Box sx={{ width: '62.5%' }}>
                        info
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