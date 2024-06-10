'use client'
import Container from "@mui/material/Container"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import { addCommas, capitalizeFirstLetter, removeNonNumeric } from "@/utils/helper";
import "react-image-gallery/styles/css/image-gallery.css";
import './style.css'
import { ReactImageGalleryItem } from "react-image-gallery";
import Box from "@mui/material/Box";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/utils/styles";
import Button from "@mui/material/Button";
import ExtraInfo from "./extra.info";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { theme1 } from '@/utils/styles';
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CustomTabPanel } from "../home/section.two";
import PeopleAlsoBuy from "./people.also.buy";
import CustomImageGallery from "./custom.image.gallery";
import RatingComponent from "./rating";

interface IProps {
    data: null | IProducts,
    productsByCategory: null | IProducts[],
    category: null | ICategories
}
const DetailProducts = (props: IProps) => {
    const { data, productsByCategory, category } = props;
    const [images, setImages] = React.useState<ReactImageGalleryItem[] | null>(null)
    const [quantity, setQuantity] = React.useState<number>(1)
    const [value, setValue] = React.useState(0);

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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/" style={{ textDecoration: 'unset', color: 'unset' }}>
                    Home
                </Link>
                <Link
                    style={{ textDecoration: 'unset', color: 'unset' }}
                    href={`/collections/${category?.slug}_${category?._id}.html`}
                >
                    {capitalizeFirstLetter(data?.category.title || 'category')}
                </Link>
                <Typography color="text.primary">{data?.title || 'Product'}</Typography>
            </Breadcrumbs>
            <Box sx={{ mt: 2, display: { md: 'flex', xs: 'block' } }}>
                <Box sx={{ width: { md: '40%', xs: '100%' } }}>
                    <CustomImageGallery images={images} />
                </Box>
                <Box sx={{ width: { md: '60%', xs: '100%' }, display: { md: 'flex', xs: 'block' } }}>
                    <Box sx={{ width: { md: '62.5%', xs: '100%' }, mt: { md: 0, xs: 2 }, pl: 4, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                                                <ThemeProvider key={idx} theme={theme}>
                                                    <Button onClick={() => { handleClick(idx) }} variant={isChoose === idx ? 'outlined' : 'text'} color="violet">{value}</Button>
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
                                <TextField onChange={(e) => { calc(e.target.value) }} value={quantity} sx={{ maxWidth: '60px', '& .MuiInput-input': { textAlign: 'center' } }} variant="standard" />
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
                    <Box sx={{ width: { md: '37.5%', xs: '100%' }, mt: { md: 0, xs: 2 } }}>
                        <ExtraInfo />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <ThemeProvider theme={theme1}>
                        <Tabs value={value} onChange={handleChange} aria-label="information">
                            <Tab label="warranty" />
                            <Tab label="delivery" />
                        </Tabs>
                    </ThemeProvider>

                </Box>
                <CustomTabPanel value={value} index={0}>
                    {<Box dangerouslySetInnerHTML={{ __html: data?.information.warranty || '' }}></Box>}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    {<Box dangerouslySetInnerHTML={{ __html: data?.information.delivery || '' }}></Box>}
                </CustomTabPanel>
            </Box>
            <RatingComponent ratings={data?.ratings ?? []} totalRating={data?.totalRating ?? 0} idProduct={data?._id ?? ''} />
            <PeopleAlsoBuy productsByCategory={productsByCategory} />
        </Container>
    )
}
export default DetailProducts