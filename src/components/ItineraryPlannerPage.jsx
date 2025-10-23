import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import ItineraryList from './ItineraryPlanner/ItineraryList';
import ItineraryForm from './ItineraryPlanner/ItineraryForm';
import { styled } from '@mui/material/styles';

// Keep your original gradient button colors (secondary to error)
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.error.main} 90%)`,
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '20px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.error.dark} 90%)`,
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
  },
}));

const ItineraryPlannerPage = () => {
  const [itineraries, setItineraries] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);

  const handleAddItinerary = (newItinerary) => {
    setItineraries((prev) => [...prev, { ...newItinerary, id: Date.now() }]);
    setOpenForm(false);
  };

  const handleEditItinerary = (updatedItinerary) => {
    setItineraries((prev) =>
      prev.map((it) => (it.id === updatedItinerary.id ? updatedItinerary : it))
    );
    setOpenForm(false);
    setEditingItinerary(null);
  };

  const handleDeleteItinerary = (id) => {
    setItineraries((prev) => prev.filter((it) => it.id !== id));
  };

  const startEdit = (itinerary) => {
    setEditingItinerary(itinerary);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingItinerary(null);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f0f4f8 0%, #e1e8f0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          px: 2,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(106, 141, 173, 0.15)',
            py: 4,
            px: 3,
            border: '1px solid rgba(106, 141, 173, 0.1)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ 
                fontWeight: 'bold', 
                color: '#c51111ff',
                mb: 2,
              }}
            >
              Travel Itinerary Planner
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#db785fff', 
                maxWidth: 600, 
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Plan your climate-smart adventures, day by day.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <GradientButton
              variant="contained"
              onClick={() => setOpenForm(true)}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              Create New Itinerary
            </GradientButton>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              border: '3px solid rgba(106, 141, 173, 0.15)',
              boxShadow: '0 2px 12px rgba(106, 141, 173, 0.08)',
            }}
          >
            {itineraries.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography 
                  variant="h5" 
                  color="#7D93A8" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 300
                  }}
                >
                  No itineraries planned yet.
                </Typography>
                <Typography 
                  variant="body1" 
                  color="#222f3bff"
                  sx={{ opacity: 0.8 }}
                >
                  Start by creating your first itinerary!
                </Typography>
              </Box>
            ) : (
              <ItineraryList
                itineraries={itineraries}
                onEdit={startEdit}
                onDelete={handleDeleteItinerary}
              />
            )}
          </Paper>
        </Container>

        <Dialog 
          open={openForm} 
          onClose={handleCloseForm} 
          fullWidth 
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(106, 141, 173, 0.2)'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              backgroundColor: '#6A8DAD',
              color: 'white', 
              pb: 2,
              pt: 3
            }}
          >
            <Typography variant="h5" component="h2" fontWeight="bold">
              {editingItinerary ? 'Edit Itinerary' : 'Create New Itinerary'}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>
            <ItineraryForm
              onSubmit={editingItinerary ? handleEditItinerary : handleAddItinerary}
              initialData={editingItinerary}
              onCancel={handleCloseForm}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default ItineraryPlannerPage;