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
import { Box } from "@mui/material";

const images: ReactImageGalleryItem[] = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

interface IProps {
    data: null | IProducts
}
const DetailProducts = (props: IProps) => {
    const { data } = props;
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
                    <ImageGallery items={images} />
                </Box>
                <Box sx={{ width: '60%', display: 'flex' }}>
                    <Box sx={{ width: '62.5%' }}>
                        info
                    </Box>
                    <Box sx={{ width: "37.5%" }}>
                        extra
                    </Box>
                </Box>

            </Box>
        </Container>
    )
}
export default DetailProducts