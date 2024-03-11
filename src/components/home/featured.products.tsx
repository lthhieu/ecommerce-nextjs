'use client'
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { Item } from "@/utils/styles";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { addCommas, removeNonNumeric } from "@/utils/helper";

interface IProps {
    featuredProducts: IProducts[] | []
}
const FeaturedProducts = (props: IProps) => {
    const { featuredProducts } = props;
    return (
        <Container sx={{ mt: 1 }}>
            <Typography sx={{ py: 1, textTransform: 'uppercase', fontWeight: 500, fontSize: '16px' }}>Featured Products</Typography>
            <Divider color="#7F00FF" sx={{ height: 2 }} />
            <Box sx={{ flexGrow: 1, mt: 2 }}>
                <Grid container spacing={2}>
                    {FeaturedProducts.length > 0 && featuredProducts.map((item) => {
                        return (
                            <Grid key={item._id} md={4} xs={12} sm={6}>
                                <Item>
                                    <Box sx={{ display: 'flex', py: 1, width: 1 }}>
                                        <Box sx={{ width: '30%' }}><Image alt={item.thumb} width={85} height={85} src={item.thumb} /></Box>
                                        <Box sx={{ paddingBottom: 2, paddingLeft: 2, width: '70%', textAlign: 'left' }}>
                                            <Typography sx={{ width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} fontWeight={500} fontSize={15}>{item.title}</Typography>
                                            <Rating sx={{ marginLeft: '-1px' }} size="small" value={item.totalRating} readOnly />
                                            <Typography>{addCommas(removeNonNumeric(item.price))} VND</Typography>
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
export default FeaturedProducts