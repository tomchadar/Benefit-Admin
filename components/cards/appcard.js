import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
    drawerBackground,
    drawerFontColorActive,
    grayText,
} from '../../constants/colors';
import * as Pages from '../../constants/pages';
import ListItemButton from '@mui/material/ListItemButton';
import Image from 'next/image';
import ListItem from '@mui/material/ListItem';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#F8F9FA',
    '&:hover': {
        backgroundColor: '#E0E7ED',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const imgUrl =
    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const AppHeader = ({ currentPage, name, company, changePage }) => {
    const [anchorEl, setAnchorEl] = React.useState();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [companyShort, setCompanyShort] = React.useState('');
    const [isMouseEnter, setIsMouseEnter] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    React.useEffect(() => {
        const maxLength = 25;
        if (company.length > 25 && !isMouseEnter) {
            setCompanyShort(company.substring(0, maxLength) + '...');
        } else {
            setCompanyShort(company);
        }
    }, [company, isMouseEnter]);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const imgLoader = () => {
        return `/assets/images/Employee.png`;
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                background: 'rgba(0,0,0,0)',
            }}
        >
            <Toolbar sx={{ padding: '0px !important' }}>
                <Typography
                    variant="h5"
                    component="h6"
                    // style={{ paddingBottom: 20 }}
                >
                    {currentPage.split('_').splice(0, 1).join(' ')}
                </Typography>
                {/*<Search>*/}
                {/*    <SearchIconWrapper>*/}
                {/*        <SearchIcon />*/}
                {/*    </SearchIconWrapper>*/}
                {/*    <StyledInputBase*/}
                {/*        placeholder="Search…"*/}
                {/*        inputProps={{ 'aria-label': 'search' }}*/}
                {/*    />*/}
                {/*</Search>*/}
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {/*<IconButton*/}
                    {/*    size="large"*/}
                    {/*    aria-label="show 17 new notifications"*/}
                    {/*    color="inherit"*/}
                    {/*>*/}
                    {/*    <Badge badgeContent={17} color="error">*/}
                    {/*        <NotificationsOutlinedIcon />*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}
                    {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
                    {/*    <Badge color="error" onClick={() => changePage(Pages.SETTINGS_PAGE)}>*/}
                    {/*        <SettingsOutlinedIcon />*/}
                    {/*    </Badge>*/}
                    {/*</IconButton>*/}

                    <div
                        style={{
                            borderRadius: 15,
                            width: '90%',
                            marginLeft: 10,
                            marginRight: 10,
                            bottom: 10,
                            height: '65px',
                        }}
                        key={Pages.HELP_PAGE}
                    >
                        <ListItem>
                            <img
                                src={imgUrl}
                                alt="Benefit"
                                style={{ borderRadius: 200 }}
                                width={30}
                                height={30}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flex: 1,
                                    marginLeft: '10px',
                                }}
                            >
                                <Typography
                                    className={'font-face-pd'}
                                    sx={{ color: drawerBackground }}
                                >
                                    {name}
                                </Typography>
                            </div>
                        </ListItem>
                    </div>
                </Box>
            </Toolbar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default AppHeader;
