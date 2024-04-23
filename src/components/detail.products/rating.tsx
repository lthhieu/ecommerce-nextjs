'use client'

import { theme } from "@/utils/styles"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { ThemeProvider, styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import _ from "lodash"

interface IProps {
    totalRating: number
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#48bb78' : '#1ead5a',
    },
}));

const ProgressComponent = ({ idx, value, total }: { idx: number, value: number, total: number }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
            <Typography >{idx}</Typography>
            <Rating size="small" max={1} value={1} />
            <Box sx={{ width: '100%' }}>
                <BorderLinearProgress variant="determinate" value={value / 100 * value} />
            </Box>
            <Typography variant="body2" color="text.secondary">{total}</Typography>
        </Box>
    )
}

const RatingComponent = (props: IProps) => {
    const { totalRating } = props
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ py: 1, fontWeight: 500, fontSize: '18px', letterSpacing: '.1rem', }}>Reviews and Comments</Typography>
                <Typography sx={{ py: 1, fontWeight: 500, fontSize: '14px', letterSpacing: '.1rem', }}>99</Typography>
            </Box>
            <Divider color="#7F00FF" sx={{ height: 2 }} />
            <Box sx={{ flexGrow: 1, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Typography sx={{ fontSize: '22px' }}>Average rating</Typography>
                    <Typography sx={{ fontSize: '38px', color: '#7F00FF', fontWeight: 500 }}>{totalRating}/5</Typography>
                    <Rating value={totalRating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">100 reviews</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flexGrow: 1, px: '10%', display: "flex", flexDirection: 'column', gap: 2 }}>
                    {_.map(_.reverse(Array.from(Array(5).keys())), (item) => {
                        return (
                            <ProgressComponent key={item} idx={item + 1} value={40} total={200} />
                        )
                    })}
                </Box>
                <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Typography>Have you use this product?</Typography>
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="violet" sx={{ mt: 1 }}>Send review</Button>
                    </ThemeProvider>
                </Box>
            </Box>
        </Box>
    )
}
export default RatingComponent