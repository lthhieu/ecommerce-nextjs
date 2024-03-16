'use client'
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/utils/styles";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
interface IProps {
    images: ReactImageGalleryItem[] | null
}
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
const CustomImageGallery = (props: IProps) => {
    const { images } = props
    return (
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
    )
}
export default CustomImageGallery