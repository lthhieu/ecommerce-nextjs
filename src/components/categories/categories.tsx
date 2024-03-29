'use client'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import { CssFormControl, Item } from "@/utils/styles";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { addCommas, removeNonNumeric } from '@/utils/helper';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { sortArray } from '@/utils/constant';
interface IProps {
    products: IProducts[] | null,
    category: ICategories | null
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
    const { products, category } = props;
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChangeName = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <CssFormControl sx={{ width: 200 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                            <Select
                                multiple
                                value={personName}
                                onChange={handleChangeName}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </CssFormControl>
                    </Box>
                    <Box>
                        <CssFormControl sx={{
                            minWidth: 120,
                        }}>
                            <InputLabel>Sort</InputLabel>
                            <Select
                                value={age}
                                onChange={handleChange}
                                autoWidth
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {sortArray.map(item => {
                                    return (
                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                    )
                                })}
                            </Select>
                        </CssFormControl>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    <Grid container spacing={2}>
                        {products && products.length > 0 && products.map((item) => {
                            return (
                                <Grid key={item._id} md={3} xs={12} sm={6}>
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
        </Container>
    )
}
export default Categories