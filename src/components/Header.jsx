import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import { getAuth, signOut } from 'firebase/auth';
import app from '../firebase';

// 🔑 Replace with your own OpenWeatherMap API key
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

// Gradient Text for Logo
const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });

  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleBellClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ✅ Logout Functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  // ✅ Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.warn('Location permission denied:', err)
    );
  }, []);

  // ✅ Fetch weather alerts once location is ready
  useEffect(() => {
    if (!location.lat || !location.lon) return;
    const fetchWeatherAlerts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`
        );
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error('Error fetching weather alerts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherAlerts();
  }, [location]);

  const navLinks = [
    { label: 'Explore', to: '/explore' },
    { label: 'Profile', to: '/profile' },
    { label: 'Itinerary Planner', to: '/itinerary-planner' },
    { label: 'Community Forum', to: '/community-forum' },
    { label: 'AI Recommendations', to: '/recommendations' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <PublicIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
        <GradientText variant="h6">Klymates</GradientText>
        <Chip
          label="Live"
          size="small"
          color="primary"
          variant="outlined"
          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
        />
      </Box>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.to}>
            <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
        {/* Add Logout inside drawer for mobile */}
        <Divider sx={{ my: 1 }} />
        <ListItem button onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1, color: 'error.main' }} />
          <ListItemText primary="Logout" sx={{ color: 'error.main', textAlign: 'center' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, gap: { xs: 1, md: 2 } }}>
            {/* Left Section - Logo and Hamburger */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              {/* Mobile Menu Icon */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PublicIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                <GradientText variant="h6">Klymates</GradientText>
                <Chip
                  label="Live"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                />
              </Box>
            </Box>

            {/* Center Links - Desktop Only */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                gap: 4,
              }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  color="inherit"
                  component={Link}
                  to={link.to}
                  sx={{
                    fontWeight: 'bold',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Right Section - Notifications + Logout */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* 🔔 Weather Alerts Bell */}
              <Tooltip title="Weather Alerts">
                <IconButton
                  onClick={handleBellClick}
                  sx={{ color: 'text.primary', '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <Badge badgeContent={alerts.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* 🔽 Dropdown Menu for Alerts */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: { width: 300, maxHeight: 400, p: 1 },
                }}
              >
                {loading ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : alerts.length === 0 ? (
                  <MenuItem disabled>No active weather alerts</MenuItem>
                ) : (
                  alerts.map((alert, index) => (
                    <MenuItem key={index} sx={{ whiteSpace: 'normal' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {alert.event}
                        </Typography>
                        <Typography variant="body2">{alert.description}</Typography>
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Menu>

              {/* ✅ Logout Button */}
              <Tooltip title="Logout">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  Logout
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
