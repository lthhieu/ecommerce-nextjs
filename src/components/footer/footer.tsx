'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation'

const pages = ['products', 'introduction', 'blog'];
const settings = ['dashboard', 'logout'];

function Footer() {
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '30ch',
                '&:focus': {
                    width: '40ch',
                },
            },
        },
    }));

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {pages.map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => router.push(`/${text}`)}>
                            <ListItemIcon>
                                <ChevronRightIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ textTransform: 'capitalize' }} primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#343a40', mt: 2 }}>
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'none', md: 'space-between' }, flexDirection: { xs: 'column', md: 'row' } }}>
                        <Typography
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                            }}
                        >
                            Copyright &copy;2024, Ly Tran Hoang Hieu
                        </Typography>
                        <Typography
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                            }}
                        >
                            Everything you need
                        </Typography>
                    </Box>
                    {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
                        <Typography
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '12px'
                            }}
                        >
                            Copyright &copy;2024, Ly Tran Hoang Hieu
                        </Typography>
                        <Typography
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '12px'
                            }}
                        >
                            Everything you need
                        </Typography>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Footer;

