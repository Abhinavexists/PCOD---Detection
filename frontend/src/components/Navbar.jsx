import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import HomeIcon from '@mui/icons-material/Home';
import DetectionIcon from '@mui/icons-material/LocalHospital';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const Navbar = (props) => {
  const auth = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'black', height: '100%', color: 'pink' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        PCOD Detection
      </Typography>
      <Divider sx={{ bgcolor: 'pink' }} />
      <List>
        {auth?.isLoggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/">
                <HomeIcon />
                <ListItemText primary="Home" sx={{ color: 'pink', ml: 1 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/detection">
                <DetectionIcon />
                <ListItemText primary="Detection" sx={{ color: 'pink', ml: 1 }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/signup">
                <LoginIcon />
                <ListItemText primary="Sign Up" sx={{ color: 'pink', ml: 1 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to="/login">
                <LoginIcon />
                <ListItemText primary="Login" sx={{ color: 'pink', ml: 1 }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'pink' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'pink' }}
          >
            PCOD Detection
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {auth?.isLoggedIn ? (
              <>
                <Button sx={{ color: 'pink' }} component={Link} to="/">
                  <HomeIcon />
                  Home
                </Button>
                <Button sx={{ color: 'pink' }} component={Link} to="/detection">
                  <DetectionIcon />
                  Detection
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: 'pink' }} component={Link} to="/signup">
                  <LoginIcon />
                  Sign Up
                </Button>
                <Button sx={{ color: 'pink' }} component={Link} to="/login">
                  <LoginIcon />
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
