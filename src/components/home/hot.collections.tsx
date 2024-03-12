'use client'
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { Item } from "@/utils/styles";
import Image from "next/image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IProps {
    categoriesWithBrands: [] | ICollections[]
}
const HotCollections = (props: IProps) => {
    const { categoriesWithBrands } = props;
    return (
        <Container sx={{ mt: 1 }}>
            <Typography sx={{ py: 1, textTransform: 'uppercase', fontWeight: 500, fontSize: '16px' }}>hot collections</Typography>
            <Divider color="#7F00FF" sx={{ height: 2 }} />
            <Box sx={{ flexGrow: 1, my: 2 }}>
                <Grid container spacing={2}>
                    {categoriesWithBrands.map((item) => {
                        return (
                            <Grid key={item.category._id} md={4} xs={12} sm={6}>
                                <Item sx={{ height: '100%' }}>
                                    <Box sx={{ display: 'flex', py: 1, width: 1 }}>
                                        <Box sx={{ width: '40%' }}><Image alt={item.category.title} width={133} height={129} src={item.category.image} /></Box>
                                        <Box sx={{ paddingBottom: 2, paddingLeft: 2, width: '60%', textAlign: 'left' }}>
                                            <Typography sx={{ width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight={500} fontSize={18}>{item.category.title}</Typography>
                                            {item.brands.map(brand => {
                                                return (
                                                    <Typography sx={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 1 }} key={brand._id}><ArrowForwardIosIcon fontSize='inherit' />{brand.title}</Typography>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </Container>
    )
}
export default HotCollections