// Updated Header.jsx with better integration
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
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

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
}))

const Header = ({ onMenuToggle, onSearch, sidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Trigger search functionality
    }
  }

  return (
    <AppBar 
      position="static" 
      color="transparent"
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1, gap: 2 }}>
          {/* Left Section - Logo and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onMenuToggle}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
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

          {/* Center Section - Search */}
          <Box 
            component="form" 
            onSubmit={handleSearchSubmit}
            sx={{ 
              flexGrow: 1,
              maxWidth: 600,
              mx: 4
            }}
          >
            <SearchField
              fullWidth
              size="small"
              placeholder="Search destinations, climates, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
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
            
            <Button
              startIcon={<AccountCircleIcon />}
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                borderRadius: '20px',
                px: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Sign In
            </Button>
            
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