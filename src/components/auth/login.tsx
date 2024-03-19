'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssTextField, theme } from '@/utils/styles';
import ReplyIcon from '@mui/icons-material/Reply';
import Link from 'next/link';

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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <CssTextField margin="normal" fullWidth label="Email Address" autoFocus name="email" />
                    <CssTextField margin="normal" fullWidth label="Password" type="password" name="password" />
                    <ThemeProvider theme={theme}>
                        <Button type="submit"
                            fullWidth sx={{
                                mt: 3, mb: 2
                            }} variant="contained" color="violet"> Sign In</Button>
                    </ThemeProvider>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" style={{ color: 'unset', textDecoration: 'unset' }} onMouseEnter={(e) => (e.target as HTMLInputElement).style.color = '#7F00FF'}
                                onMouseLeave={(e) => (e.target as HTMLInputElement).style.color = 'unset'}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" style={{ color: 'unset', textDecoration: 'unset' }} onMouseEnter={(e) => (e.target as HTMLInputElement).style.color = '#7F00FF'}
                                onMouseLeave={(e) => (e.target as HTMLInputElement).style.color = 'unset'}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}