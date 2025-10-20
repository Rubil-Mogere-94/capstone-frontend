import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PublicIcon from '@mui/icons-material/Public';
import { styled, useTheme } from '@mui/material/styles';

// Re-define GradientButton for this component
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  '&:hover': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(to bottom right, ${theme.palette.grey[900]}, ${theme.palette.grey[800]})`,
        color: theme.palette.grey[300],
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 128,
            height: 128,
            backgroundColor: theme.palette.primary.light,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 192,
            height: 192,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: '50%',
            transform: 'translate(33%, 33%)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2, sm: 3, lg: 4 } }}>
        <Grid container spacing={4} sx={{ py: 6, borderBottom: '1px solid', borderColor: theme.palette.grey[700] }}>
          {/* Brand Section */}
          <Grid sx={{ xs: 12, md: 4 }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', mb: 2 }}>
                <Box
                  sx={{
                    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    p: 1,
                    borderRadius: '8px',
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PublicIcon sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
                  Klymates
                </Typography>
              </Box>
            </motion.div>
            <Typography variant="body2" sx={{ color: theme.palette.grey[400], mb: 3, lineHeight: '1.5' }}>
              Your ultimate guide to climate-smart travel. Discover destinations with ideal weather, compare
              conditions, and plan your perfect trip with confidence.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[TwitterIcon, InstagramIcon, FacebookIcon].map((Icon, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, y: -2 }}>
                  <IconButton
                    href="#"
                    sx={{
                      backgroundColor: 'rgba(66, 66, 66, 0.5)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                      },
                      p: 1,
                      borderRadius: '8px',
                      backdropFilter: 'blur(4px)',
                      color: 'inherit',
                    }}
                  >
                    <Icon sx={{ fontSize: 16 }} />
                  </IconButton>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid sx={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
              Explore
            </Typography>
            <List sx={{ p: 0 }}>
              {['Home', 'Destinations', 'Climate Guides', 'Travel Tips'].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    href="#"
                    sx={{
                      color: theme.palette.grey[400],
                      '&:hover': {
                        color: theme.palette.primary.light,
                        backgroundColor: 'transparent',
                      },
                      transition: 'color 200ms',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        opacity: 0,
                        transition: 'opacity 300ms',
                        '.MuiListItemButton-root:hover &': {
                          opacity: 1,
                        },
                      }}
                    />
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Support */}
          <Grid sx={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
              Support
            </Typography>
            <List sx={{ p: 0 }}>
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    href="#"
                    sx={{
                      color: theme.palette.grey[400],
                      '&:hover': {
                        color: theme.palette.primary.light,
                        backgroundColor: 'transparent',
                      },
                      transition: 'color 200ms',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        opacity: 0,
                        transition: 'opacity 300ms',
                        '.MuiListItemButton-root:hover &': {
                          opacity: 1,
                        },
                      }}
                    />
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Newsletter */}
          <Grid sx={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[400], mb: 2 }}>
              Get the latest travel insights and climate updates.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <TextField
                type="email"
                placeholder="Your email address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(66, 66, 66, 0.5)',
                    borderColor: theme.palette.grey[600],
                    borderRadius: '8px',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                    '& fieldset': {
                      borderColor: theme.palette.grey[600],
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                    px: 2,
                    fontSize: '0.875rem',
                    '&::placeholder': {
                      color: theme.palette.grey[400],
                      opacity: 1,
                    },
                  },
                }}
              />
              <GradientButton
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 'semibold',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                  },
                  transition: 'all 300ms',
                }}
              >
                Subscribe
              </GradientButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: theme.palette.grey[400], mb: { xs: 2, md: 0 } }}>
            <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
              &copy; {new Date().getFullYear()} Klymates. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ mx: 1, color: theme.palette.grey[400] }}>
              •
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                Made with
              </Typography>
              <FavoriteIcon sx={{ color: theme.palette.error.light, mx: 0.5, fontSize: 16 }} />
              <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                for travelers
              </Typography>
            </Box>
          </Box>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              onClick={scrollToTop}
              sx={{
                backgroundColor: 'rgba(66, 66, 66, 0.5)',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
                p: 1.5,
                borderRadius: '8px',
                backdropFilter: 'blur(4px)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;