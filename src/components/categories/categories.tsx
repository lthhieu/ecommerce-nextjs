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
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import _ from 'lodash';
import { externalApi } from '@/utils/api';


interface IProps {
    idCate: string,
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
    const { products, category, variants, idCate } = props;
    const [age, setAge] = useState('');
    const [priority, setPriority] = useState('');
    const [productsState, setProductsState] = useState<IProducts[]>([])
    const [variantState, setVariantState] = useState<IVariants[]>([])
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const sorting = searchParams.get('sort')
    const [sort, setSort] = useState(sorting)

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        // console.log(url.split('?')[1].replaceAll('%2C', ',').replaceAll('+', ' '))
        if (url.split('?')[1] !== '') {
            let params = _.reject(parseQueryString(url.split('?')[1].replaceAll('%2C', ',').replaceAll('+', ' ')), { label: 'Sort' })
            if (!_.isEmpty(params)) {
                setVariantState(params)
            }
        } else {
            setProductsState(products ?? [])
        }
    }, [])
    useEffect(() => {
        let timer = setTimeout(() => {
            if (variantState && sort) {
                if (variantState.length > 0 && sort) {
                    handleFilter()
                    let orQuery = ''
                    _.forEach(variantState, (item, idx: number) => {
                        orQuery += `${item.label.toLowerCase()}=${item.variants.join(',')}`
                        orQuery += variantState.length - idx - 1 === 0 ? '' : '&'
                    })
                    setPriority(_.find(sortArray, { 'value': sort })?.label ?? 'Best selling')
                    router.push(pathname + '?' + orQuery + '&sort=' + sort)
                } else {
                    handleSortData()
                    setPriority(_.find(sortArray, { 'value': sort })?.label ?? 'Best selling')
                    router.push(pathname + `?sort=${sort}`)
                }
            } else {
                if (variantState.length > 0) {
                    handleFilter()
                    let orQuery = ''
                    _.forEach(variantState, (item, idx: number) => {
                        orQuery += `${item.label.toLowerCase()}=${item.variants.join(',')}`
                        orQuery += variantState.length - idx - 1 === 0 ? '' : '&'
                    })

                    const filterQuery = orQuery !== '' ? `?${orQuery}` : ''
                    router.push(pathname + filterQuery)
                }
                setPriority('Best selling')
            }

        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [sort, variantState])
    function parseQueryString(str: string) {
        const pairs = str.split('&');
        const result: IVariants[] = [];

        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            const obj = {} as IVariants;
            obj.label = capitalizeFirstLetter(key);
            obj.variants = value.split(',').map(val => val.trim());

            result.push(obj);
        });

        return result;
    }
    const handleFilter = async () => {
        let orQuery = [] as any
        _.forEach(variantState, item => {
            orQuery.push({
                "variants.label": item.label,
                "variants.variants": { "$in": item.variants }
            })
        })
        const queryString = JSON.stringify({ "$or": orQuery });
        const sortOrder = !sort ? "-sold" : sort
        const filterQuery = orQuery.length > 0 ? `&filter=${queryString}` : ''
        if (filterQuery === '') {
            setProductsState(products ?? [])
        } else {
            const url = `/products?category=${idCate}&current=1&pageSize=100${filterQuery}&sort=${sortOrder}`
            const response = await externalApi
                .url(url)
                .get()
                .json<IBackendResponse<IPagination<IProducts[]>>>()
            if (response.data) {
                setProductsState(response.data.result ?? [])
            }
        }
    }
    const handleSortData = async () => {
        const response = await externalApi
            .url(`/products?category=${idCate}&current=1&pageSize=100&sort=${sort}`)
            .get()
            .json<IBackendResponse<IPagination<IProducts[]>>>()
        if (response.data) {
            setProductsState(response.data.result)
        }
    }
    const handleView = (value: string) => {
        setSort(value)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const handleVariants = (label: string, value: string) => {
        setVariantState((prev: any) => {
            if (value === '') {
                _.remove(variantState, { label: label })
                return [...prev]
            }
            const isExistedLabel = _.findIndex(variantState, { label: label })
            if (isExistedLabel === -1) {
                return [...prev, { label: label, variants: [value] }]
            } else {
                let temp = variantState[isExistedLabel]
                if (temp.variants.includes(value)) {
                    _.pull(temp.variants, value)
                    if (_.isEmpty(temp.variants)) {
                        _.pull(variantState, temp)
                    }
                } else {
                    const other = _.concat(temp.variants, value)
                    _.pull(variantState, temp)
                    return [...prev, { label: label, variants: other }]
                }
                return [...prev]
            }
        })
    }

    const handleChecked = (label: string, value: string) => {
        const idx = _.findIndex(variantState, { label: label })
        if (idx === -1) {
            return false
        } else {
            if (_.findIndex(variantState[idx].variants, (item) => item === value) === -1) {
                return false
            } else {
                return true
            }
        }

    }

    const [personName, setPersonName] = useState<string[]>([]);


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
        <Container sx={{ mt: 2, minHeight: `calc(100vh - ${theme.spacing(21)})` }}>
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
                                        <Grid sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <FormControlLabel
                                                onClick={() => {
                                                    handleVariants(variant.label, '')
                                                }}
                                                sx={{ flex: '1 40%' }} control={<Checkbox sx={{
                                                    '&.Mui-checked': {
                                                        color: '#7F00FF',
                                                    },
                                                }} checked={_.findIndex(variantState, { label: variant.label }) === -1 ? true : false} />} label='All' />
                                            {variant.variants.map((value, idx) => {
                                                return (
                                                    <FormControlLabel
                                                        onClick={() => {
                                                            handleVariants(variant.label, value)
                                                        }}
                                                        sx={{ flex: '1 40%' }} key={idx} control={<Checkbox sx={{
                                                            '&.Mui-checked': {
                                                                color: '#7F00FF',
                                                            },
                                                        }} checked={handleChecked(variant.label, value)} />} label={value.charAt(0).match(/\d/) ?
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
                                            <Button onClick={() => { handleView(item.value) }} variant={priority === item.label ? 'contained' : 'outlined'} sx={{ textTransform: 'capitalize' }} color="violet" >
                                                {item.label}
                                            </Button>
                                        </ThemeProvider>
                                    )
                                })}
                            </ButtonGroup>
                        </Box>
                        <Grid container spacing={2}>
                            {productsState && productsState.length > 0 && productsState.map((item) => {
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