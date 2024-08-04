'use client'

import { CssTextField, theme } from "@/utils/styles"
import Button from "@mui/material/Button"
import Rating from "@mui/material/Rating"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import { ThemeProvider, styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import _ from "lodash"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import { useSession } from "next-auth/react"
import StarIcon from '@mui/icons-material/Star';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { externalApi } from "@/utils/api"
import productAction from "@/app/actions"
import { useToast } from "@/utils/toast.mui"
import Feedback from "./feedback"

interface IProps {
    totalRating: number,
    idProduct: string,
    ratings: []
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

const ProgressComponent = ({ idx, totalRatings, total }: { idx: number, totalRatings: number, total: number }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: .5 }}>
            <Typography >{idx}</Typography>
            <Rating size="small" max={1} value={1} />
            <Box sx={{ width: '100%' }}>
                <BorderLinearProgress variant="determinate" value={total / totalRatings * 100} />
            </Box>
            <Typography variant="body2" color="text.secondary">{total}</Typography>
        </Box>
    )
}


const labels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
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
    }, [hover, value])

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

const icon = (idProduct: string, token: string) => {
    const [valueRating, setValueRating] = useState<number | null>(2)
    const toast = useToast()
    return (
        <Paper sx={{ py: 2 }}>
            <Formik
                initialValues={{ comment: '' }}
                validationSchema={Yup.object({
                    // stars: Yup.number().required('Required'),
                    comment: Yup.string().required('Required').test('len', 'At least 10 characters', val => val.length >= 10),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
                        // console.log(values.comment, valueRating, idProduct)
                        const response = await externalApi
                            .url(`/products/rating/${idProduct}`).auth(`Bearer ${token}`)
                            .patch({
                                star: valueRating, comment: values.comment, postedAt: Date.now()
                            })
                            .json<IBackendResponse<IPagination<IProducts[]>>>()
                        if (response.data) {
                            productAction()
                            //clear data
                            resetForm({
                                values: {
                                    comment: ''
                                }
                            });
                            setValueRating(2)
                            toast.success('Voted successfully!')
                        }
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: .5, alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>How many stars would you rate this product?</Typography>
                                <HoverRating value={valueRating} setValue={setValueRating} />
                            </Box>
                            <Box sx={{ width: '60%', display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Box sx={{
                                    '& .MuiTextField-root': { width: '60ch' },
                                }}>
                                    <CssTextField
                                        multiline
                                        {...formik.getFieldProps('comment')}
                                        required helperText={formik.errors.comment} error={formik.touched.comment && formik.errors.comment ? true : false} margin="normal" fullWidth label="Đánh giá đi bạn trẻ" name='comment' />
                                </Box>

                                <ThemeProvider theme={theme}>
                                    <LoadingButton
                                        type="submit"
                                        loading={formik.isSubmitting}
                                        fullWidth sx={{
                                            my: 2,
                                        }}
                                        color="violet"
                                        variant="contained"
                                    >
                                        <span>Vote</span>
                                    </LoadingButton>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
            {/* <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', gap: .5, alignItems: 'center', justifyContent: 'center' }}>
                <Typography>How many stars would you rate this product?</Typography>
                <HoverRating value={valueRating} setValue={setValueRating} />
            </Box>
            <Box sx={{ width: '60%', display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box sx={{
                    '& .MuiTextField-root': { width: '60ch' },
                }}>         
                    <TextField
                        id="outlined-textarea"
                        label="Multiline Placeholder"
                        placeholder="Placeholder"
                        multiline
                    />
                </Box>

                <Button onClick={() => { alert(valueRating) }} variant="contained">submit</Button>
            </Box> */}
        </Paper>
    )

};

const RatingComponent = (props: IProps) => {
    const { totalRating, idProduct, ratings } = props
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
                <Typography sx={{ py: 1, fontWeight: 500, fontSize: '18px', letterSpacing: '.1rem', }}>Rating and Feedback</Typography>
                <Typography sx={{ py: 1, fontWeight: 500, fontSize: '14px', letterSpacing: '.1rem', }}>{ratings.length}</Typography>
            </Box>
            <Divider color="#7F00FF" sx={{ height: 2 }} />
            <Box sx={{ flexGrow: 1, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center', width: '20%' }}>
                    <Typography sx={{ fontSize: '22px' }}>Average rating</Typography>
                    <Typography sx={{ fontSize: '38px', color: '#7F00FF', fontWeight: 500 }}>{totalRating}/5</Typography>
                    <Rating value={totalRating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">{ratings.length} reviews</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flexGrow: 1, px: '10%', display: "flex", flexDirection: 'column', gap: 2 }}>
                    {_.map(_.reverse(Array.from(Array(5).keys())), (item) => {
                        return (
                            <ProgressComponent key={item} idx={item + 1} totalRatings={ratings.length} total={ratings.length > 0 ?
                                Object.values(ratings).filter((v: IRatings) => v.star === item + 1).length : 0} />
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
                        <>{icon(idProduct, session?.access_token ?? '')}</>
                    </Collapse>
                </div>
            </Box>
            <Box>
                {ratings.length > 0 ?
                    _.map(ratings, items => {
                        return (<Feedback />)
                    }) : <Typography>No feedback</Typography>}
            </Box>
        </Box>
    )
}
export default RatingComponent