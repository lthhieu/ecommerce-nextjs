'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssTextField, Item, theme } from '@/utils/styles';
import ReplyIcon from '@mui/icons-material/Reply';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Tooltip from '@mui/material/Tooltip';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useToast } from '@/utils/toast.mui';
import LoadingButton from '@mui/lab/LoadingButton';
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link href="https://github.com/lthhieu" style={{ color: 'unset', textDecoration: 'unset' }} onMouseEnter={(e) => (e.target as HTMLInputElement).style.color = '#7F00FF'}
                onMouseLeave={(e) => (e.target as HTMLInputElement).style.color = 'unset'}>
                Ly Tran Hoang Hieu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const router = useRouter()
    const toast = useToast()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <Item
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', p: 4,
                    width: { md: '60%', xs: '100%' },
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 7px 0px"
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>

                    <Link style={{ color: '#7F00FF', textDecoration: 'unset' }} href="/"><ReplyIcon fontSize='large' /></Link>
                    <Avatar sx={{ m: 1, bgcolor: '#7F00FF' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <LockOutlinedIcon sx={{ color: '#fff' }} />
                </Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{ mt: 1, width: '100%' }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(async () => {
                                const response = await signIn('credentials', {
                                    username: values.email, password: values.password,
                                    redirect: false,
                                })
                                if (!response?.error) {
                                    router.push('/')
                                } else {
                                    toast.error(response.error ?? 'Invalid credentials')
                                }
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <CssTextField
                                    {...formik.getFieldProps('email')}
                                    required helperText={formik.errors.email} error={formik.touched.email && formik.errors.email ? true : false} margin="normal" fullWidth label="Email Address" name='email' />
                                <CssTextField
                                    onKeyDown={(e) => { if (e.key === 'Enter') formik.handleSubmit }}
                                    {...formik.getFieldProps('password')}
                                    required helperText={formik.errors.password} error={formik.touched.password && formik.errors.password ? true : false} margin="normal" fullWidth label="Password" type={showPassword ? 'text' : 'password'} name='password'
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
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
                                        <span>Sign In</span>
                                    </LoadingButton>
                                </ThemeProvider>
                            </form>
                        )}
                    </Formik>
                </Box>
                <Grid sx={{ width: '100%' }}>
                    <Divider><Chip label="Or using" size="small" /></Divider>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center', py: 1 }}>
                        <Tooltip title="Sign in with Github"><GitHubIcon onClick={() => signIn("github")} fontSize='large' sx={{ color: '#1f2328', cursor: 'pointer' }} /></Tooltip>
                        <Tooltip title="Sign in with Google"><GoogleIcon fontSize='large' sx={{ color: '#ea4335', cursor: 'pointer' }} /></Tooltip>
                        <Tooltip title="Sign in with Facebook"><FacebookIcon fontSize='large' sx={{ color: '#0866ff', cursor: 'pointer' }} /></Tooltip>
                    </Box>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Grid>
                        <Link href="#" style={{ color: 'unset', textDecoration: 'unset' }} onMouseEnter={(e) => (e.target as HTMLInputElement).style.color = '#7F00FF'}
                            onMouseLeave={(e) => (e.target as HTMLInputElement).style.color = 'unset'}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid>
                        <Link href="#" style={{ color: 'unset', textDecoration: 'unset' }} onMouseEnter={(e) => (e.target as HTMLInputElement).style.color = '#7F00FF'}
                            onMouseLeave={(e) => (e.target as HTMLInputElement).style.color = 'unset'}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Item>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}