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
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/auth"
import { useSession } from "next-auth/react"
import StarIcon from '@mui/icons-material/Star';


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


const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
const HoverRating = ({ value, setValue }: { value: number | null, setValue: Dispatch<SetStateAction<number | null>> }) => {
    const [hover, setHover] = useState(-1);
    const [color, setColor] = useState('text.secondary')
    useEffect(() => {
        if (hover === -1) {
            if (value && value >= 4) {
                setColor('#48bb78')
            }
            if (value && value > 1 && value < 4) {
                setColor('text.secondary')
            }
            if (value && value <= 1) {
                setColor('#ff6d75')
            }
        }
        if (hover <= 1 && hover > -1) {
            setColor('#ff6d75')
        }
        if (hover >= 4) {
            setColor('#48bb78')
        }
        if (hover > 1 && hover < 4) {
            setColor('text.secondary')
        }
    }, [hover])

    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2, color: color }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}

const icon = () => {
    const [valueRating, setValueRating] = useState<number | null>(2)
    return (
        <Box sx={{ height: 100, border: '1px solid', display: 'flex' }}>
            <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', gap: .5, alignItems: 'center', justifyContent: 'center' }}>
                <Typography>How many stars would you rate this product?</Typography>
                <HoverRating value={valueRating} setValue={setValueRating} />
            </Box>
            <Box sx={{ width: '60%' }}>
                <Button onClick={() => { alert(valueRating) }} variant="contained">submit</Button>
            </Box>
        </Box>
    )

};

const RatingComponent = (props: IProps) => {
    const { totalRating } = props
    const { data: session } = useSession()
    const handleClick = () => {
        if (session?.user) {
            setChecked((prev) => !prev);
        }
        else {
            alert('dang nhap di ban tre =))')
        }
    }
    const [checked, setChecked] = useState(false);

    const handleChange = () => {

    };
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
                        <Button onClick={() => { handleClick() }} variant="contained" color="violet" sx={{ mt: 1 }}>{checked ? 'Close review' : 'Send review'}</Button>
                    </ThemeProvider>
                </Box>

            </Box>
            <Box sx={{ width: '100%', mt: 2 }} >
                <div>
                    <Collapse in={checked}>
                        <>{icon()}</>
                    </Collapse>
                </div>
            </Box>
        </Box>
    )
}
export default RatingComponent