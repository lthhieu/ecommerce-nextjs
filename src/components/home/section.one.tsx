'use client'
import { Container } from "@mui/material"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Slider from "./section.one/slider";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

interface IProps {
    categories: ICategories[]
}

const SectionOne = (props: IProps) => {
    const { categories } = props;
    console.log(categories)
    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
                        <Item sx={{ height: '100%' }}>all collections</Item>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Item>
                            <Slider />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default SectionOne