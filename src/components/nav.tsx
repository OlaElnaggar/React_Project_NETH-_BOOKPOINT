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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import Badge from '@mui/material/Badge';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import bg from "../assets/nav-bg.png";
import logo from "../assets/logo-img.png";
import account_img from "../assets/account.png";

const pages = ["Home", "Shop"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Nav() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const cartCount = useSelector((state: RootState) =>
        state.products.cart.reduce((acc, item) => acc + item.qty, 0)
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar position="fixed" sx={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    
                    <Box component="img" src={logo} sx={{ width: "74px", height: "64px", display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            textDecoration: 'none',
                            color: 'secondary.main',
                            lineHeight: 1.2,
                        }}
                    >
                        NETH <br /> BOOKPOINT
                    </Typography>

                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="primary">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography component={NavLink} to={page.toLowerCase()} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/login'); }}>
                                <Typography>Login</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/cart'); }}>
                                <Typography>Cart</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    
                    <Box component="img" src={logo} sx={{ width: "54px", height: "44px", display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            textDecoration: 'none',
                            color: 'secondary.main',
                            lineHeight: 1.2,
                        }}
                    >
                        NETH <br /> BOOKPOINT
                    </Typography>

                
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="center">
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={NavLink}
                                to={page.toLowerCase()}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    textTransform: 'capitalize',
                                    fontSize: '1rem',
                                    '&.active': { color: 'secondary.main', fontWeight: 700 },
                                    '&:hover': { color: 'secondary.main' },
                                    transition: 'color 0.2s',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Login">
                            <IconButton
                                onClick={() => navigate('/login')}
                                sx={{
                                    color: 'white',
                                    display: { xs: 'none', md: 'flex' },
                                    '&:hover': { color: 'secondary.main' },
                                    transition: 'color 0.2s',
                                }}
                            >
                                <LoginIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Cart">
                            <IconButton
                                onClick={() => navigate('/cart')}
                                sx={{
                                    color: 'primary.main',
                                    display: { xs: 'none', md: 'flex' },
                                    '&:hover': { color: 'secondary.main' },
                                    transition: 'color 0.2s',
                                }}
                            >
                                <Badge badgeContent={cartCount} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>


                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                                <Avatar alt="User" src={account_img} sx={{ width: 36, height: 36 }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Nav;