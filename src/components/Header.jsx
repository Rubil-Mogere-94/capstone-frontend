import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PublicIcon from '@mui/icons-material/Public';
import { styled } from '@mui/material/styles';

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <Chip label="Live" size="small" color="primary" variant="outlined" sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} />
      </Box>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.to}>
            <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
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
            {/* Left Section - Logo and Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              {/* Hamburger Icon */}
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
                <GradientText variant="h6">
                  Klymates
                </GradientText>
                <Chip 
                  label="Live" 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                />
              </Box>
            </Box>

            {/* Center Nav Links (Desktop Only) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  color="inherit"
                  component={Link}
                  to={link.to}
                  sx={{ fontWeight: 'bold' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ color: 'text.primary', '&:hover': { bgcolor: 'action.hover' } }}>
                <NotificationsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better performance on mobile
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
