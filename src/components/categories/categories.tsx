'use client'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import { Item, theme } from "@/utils/styles";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { addCommas, capitalizeFirstLetter, removeNonNumeric } from '@/utils/helper';
import { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { sortArray } from '@/utils/constant';
import { ThemeProvider } from '@mui/material';

interface IProps {
    products: IProducts[] | null,
    category: ICategories | null,
    variants: IVariants[]
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const Categories = (props: IProps) => {
    const { products, category, variants } = props;
    const [age, setAge] = useState('');
    const [priority, setPriority] = useState('');
    useEffect(() => {
        if (products && products?.length > 0) {
            setPriority(sortArray[0].label)
        }
    }, [])
    const handleView = (value: string) => {
        setPriority(value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [personName, setPersonName] = useState<string[]>([]);
    // const [internal, setInternal] = useState<string[]>([]);
    // const [color, setColor] = useState<string[]>([]);
    // const [capacity, setCapacity] = useState<string[]>([]);
    // const [size, setSize] = useState<string[]>([]);
    // const [ram, setRam] = useState<string[]>([]);


    const handleChangeName = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/" style={{ textDecoration: 'unset', color: 'unset' }}>
                    Home
                </Link>
                <Typography color="text.primary">{category?.title ?? 'Product'}</Typography>
            </Breadcrumbs>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ flexGrow: 1, mt: 2, display: 'flex' }}>
                    <Box sx={{ width: '23%' }}>
                        {variants.map(variant => {
                            return (
                                <Box key={variant.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'self-start' }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: 18 }}>{variant.label}</Typography>
                                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }} >
                                        <FormControlLabel control={<Checkbox sx={{
                                            '&.Mui-checked': {
                                                color: '#7F00FF',
                                            },
                                        }} defaultChecked />} label='All' />

                                        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {variant.variants.map((value, idx) => {
                                                return (
                                                    <FormControlLabel sx={{ flex: '1 40%' }} key={idx} control={<Checkbox sx={{
                                                        '&.Mui-checked': {
                                                            color: '#7F00FF',
                                                        },
                                                    }} />} label={value.charAt(0).match(/\d/) ?
                                                        value : capitalizeFirstLetter(value)} />
                                                )
                                            })}
                                        </Grid>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{ width: '77%' }}>
                        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                            <Typography sx={{ py: 1, fontWeight: 500, fontSize: '16px' }}>Viewing priority</Typography>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                {sortArray.map((item) => {
                                    return (
                                        <ThemeProvider key={item.id} theme={theme}>
                                            <Button onClick={() => { handleView(item.label) }} variant={priority === item.label ? 'contained' : 'outlined'} sx={{ textTransform: 'capitalize' }} color="violet" >
                                                {item.label}
                                            </Button>
                                        </ThemeProvider>
                                    )
                                })}
                            </ButtonGroup>
                        </Box>
                        <Grid container spacing={2}>
                            {products && products.length > 0 && products.map((item) => {
                                return (
                                    <Grid key={item._id} md={4} xs={12} sm={6}>
                                        <Item sx={{ textAlign: 'start' }}>
                                            <Link style={{ textDecoration: 'unset', color: 'unset' }} href={`/collections/${item.category.title.toLowerCase()}/products/${item.slug}_${item._id}.html`}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                                    <Box sx={{ marginTop: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Image src={item.thumb} alt="image" width={250} height={250} style={{ objectFit: 'contain' }} />
                                                    </Box>
                                                    <Box sx={{ paddingX: 4, paddingBottom: 2, width: 1 }}>
                                                        <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight={500} fontSize={17}>{item.title}</Typography>
                                                        <Rating sx={{ marginLeft: '-1px' }} size="small" name="read-only" value={item.totalRating} readOnly />
                                                        <Typography>{addCommas(removeNonNumeric(item.price))} VND</Typography>
                                                    </Box>
                                                </Box>
                                            </Link>
                                        </Item>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
export default Categories