// Updated Sidebar.jsx with better mobile handling
import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material'
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  Map as MapIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Close as CloseIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material'

const Sidebar = ({ open, onClose, isMobile }) => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '#' },
    { text: 'Explore', icon: <ExploreIcon />, path: '#' },
    { text: 'Destinations', icon: <MapIcon />, path: '#' },
    { text: 'Settings', icon: <SettingsIcon />, path: '#' },
    { text: 'About', icon: <InfoIcon />, path: '#' },
    { text: 'Contact', icon: <ContactMailIcon />, path: '#' },
  ]

  const drawerContent = (
    <>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Menu
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* Profile Section */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: 'auto',
            mb: 2,
            bgcolor: 'primary.light',
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h6" sx={{ color: 'white', mb: 0.5 }}>
          Traveler User
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.400' }}>
          Premium Member
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

      {/* Navigation Menu */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ color: 'grey.400', textAlign: 'center' }}>
          Klymates v1.0
        </Typography>
      </Box>
    </>
  )

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              bgcolor: 'primary.dark',
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 240 : 60,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? 240 : 60,
              boxSizing: 'border-box',
              bgcolor: 'primary.dark',
              background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  )
}

export default Sidebar