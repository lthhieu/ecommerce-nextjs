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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
interface ChipData {
    key: string;
    label: string;
    value: string;
}

interface IProps {
    idCate: string,
    products: IProducts[] | null,
    category: ICategories | null,
    variants: IVariants[]
}
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
    const [chipData, setChipData] = useState<any>([]);


    useEffect(() => {
        const url = `${pathname}?${searchParams}`
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
                    let orQuery = ''
                    _.forEach(variantState, (item, idx: number) => {
                        orQuery += `${item.label.toLowerCase()}=${item.variants.join(',')}`
                        orQuery += variantState.length - idx - 1 === 0 ? '' : '&'
                    })
                    setPriority(_.find(sortArray, { 'slug': sort })?.label ?? 'Best selling')
                    const temp = _.map(variantState, (item) => {
                        return _.map(item.variants, (value) => {
                            return {
                                key: `${item.label}-${value}`,
                                label: item.label,
                                value: value
                            }
                        })
                    }) ?? []
                    setChipData(temp)
                    handleFilter()
                    router.push(pathname + '?' + orQuery + '&sort=' + sort)
                } else {
                    setPriority(_.find(sortArray, { 'slug': sort })?.label ?? 'Best selling')
                    handleSortData()
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
                    const temp = _.map(variantState, (item) => {
                        return _.map(item.variants, (value) => {
                            return {
                                key: `${item.label}-${value}`,
                                label: item.label,
                                value: value
                            }
                        })
                    }) ?? []
                    setChipData(temp as any)
                    router.push(pathname + filterQuery)
                } else {
                    handleFilter()
                    router.push(pathname)
                    setChipData([])
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
        const sortOrder = !sort ? "-sold" : _.find(sortArray, { slug: sort })?.value
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
        const sortOrder = !sort ? "-sold" : _.find(sortArray, { slug: sort })?.value
        const response = await externalApi
            .url(`/products?category=${idCate}&current=1&pageSize=100&sort=${sortOrder}`)
            .get()
            .json<IBackendResponse<IPagination<IProducts[]>>>()
        if (response.data) {
            setProductsState(response.data.result)
        }
    }
    const handleView = (value: string) => {
        setSort(_.find(sortArray, { value })?.slug ?? 'best-selling')
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
            }
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

    const ChipLabel = ({ label, value }: { label: string, value: string }) => {
        if (value === '') {
            return (
                <Typography sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: .5 }}>{capitalizeFirstLetter(`${label}`)} <CancelRoundedIcon fontSize='small' /></Typography>
            )
        }
        return (
            <Typography sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: .5 }}>{capitalizeFirstLetter(`${label}-${value.charAt(0).match(/\d/) ?
                value : capitalizeFirstLetter(value)}`)} <CancelRoundedIcon fontSize='small' /></Typography>
        )
    }
    return (
        <Container sx={{ mt: 2, minHeight: `calc(100vh - ${theme.spacing(21)})` }}>
            <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: { md: 0, xs: 1 } }}>
                <Breadcrumbs sx={{ width: { md: '23%', xs: '100%' } }} separator="›" aria-label="breadcrumb">
                    <Link href="/" style={{ textDecoration: 'unset', color: 'unset' }}>
                        Home
                    </Link>
                    <Typography color="text.primary">{category?.title ?? 'Product'}</Typography>
                </Breadcrumbs>

                <Box sx={{ display: { md: 'none', xs: 'flex' }, gap: 1, mt: 1 }}>
                    <ThemeProvider theme={theme}>
                        <FormControl
                            sx={{ width: '50%' }}>
                            <InputLabel sx={{ left: '-7%', top: '10%', '&.Mui-focused': { color: '#7F00FF' } }}>Arrange</InputLabel>
                            <Select
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                size='small'
                                variant='standard'
                                color='violet'
                            >

                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Button endIcon={<FilterAltIcon />} sx={{ width: '50%', textTransform: 'capitalize' }} size='small' color='violet' variant="outlined">Features</Button>
                    </ThemeProvider>
                </Box>

                <Stack sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }} direction="row">
                    {chipData.length > 0 && <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Filter by</Typography>}
                    {chipData.length > 0 && _.map(chipData, item => {
                        return _.map(item, (data: ChipData) => {
                            return (
                                <ThemeProvider key={data.key} theme={theme}>
                                    <Chip
                                        onClick={() => handleVariants(data.label, data.value)}
                                        variant="outlined"
                                        color='violet'
                                        label={<ChipLabel label={data.label} value={data.value} />}
                                    />
                                </ThemeProvider>
                            )
                        })
                    })}
                    {chipData.length > 1 && <ThemeProvider theme={theme}>
                        <Chip
                            onClick={() => setVariantState([])}
                            variant="outlined"
                            color='violet'
                            label={<ChipLabel label={'Delete all'} value={''} />}
                        />
                    </ThemeProvider>}
                </Stack>
            </Box>
            <Box sx={{ mt: 2, display: { md: 'block', xs: 'none' } }}>
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