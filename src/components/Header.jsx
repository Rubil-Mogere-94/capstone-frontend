import React from 'react'
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Avatar,
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PublicIcon from '@mui/icons-material/Public'
import { styled } from '@mui/material/styles'

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}))

const Header = () => {

  return (
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PublicIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <GradientText variant="h6">
                Klymates
              </GradientText>
              <Chip 
                label="Beta" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 4 }}>
            <Button color="inherit" component={Link} to="/explore" sx={{ fontWeight: 'bold' }}>
              Explore
            </Button>
            
            <Button color="inherit" component={Link} to="/favorites" sx={{ fontWeight: 'bold' }}>
              Favorites
            </Button>
            <Button color="inherit" component={Link} to="/profile" sx={{ fontWeight: 'bold' }}>
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/itinerary-planner" sx={{ fontWeight: 'bold' }}>
              Itinerary Planner
            </Button>
            <Button color="inherit" component={Link} to="/community-forum" sx={{ fontWeight: 'bold' }}>
              Community Forum
            </Button>
          </Box>

          {/* Right Section - User Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: 'text.primary',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <NotificationsIcon />
            </IconButton>
            
            
            
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: 'primary.main',
                fontSize: '0.875rem'
              }}
            >
              T
            </Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header