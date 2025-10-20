import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { motion } from 'framer-motion';
import ItineraryList from './ItineraryPlanner/ItineraryList';
import ItineraryForm from './ItineraryPlanner/ItineraryForm';

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 1 }}>
          Travel Itinerary Planner
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Plan your climate-smart adventures, day by day.
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenForm(true)}
          sx={{
            borderRadius: '20px',
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            '&:hover': { boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)' },
          }}
        >
          Create New Itinerary
        </Button>
      </Box>

      <Paper elevation={6} sx={{ p: 3, borderRadius: '16px', bgcolor: 'background.paper' }}>
        {itineraries.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 4 }}>
            No itineraries planned yet. Start by creating one!
          </Typography>
        ) : (
          <ItineraryList
            itineraries={itineraries}
            onEdit={startEdit}
            onDelete={handleDeleteItinerary}
          />
        )}
      </Paper>

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', pb: 1 }}>
          {editingItinerary ? 'Edit Itinerary' : 'Create New Itinerary'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <ItineraryForm
            onSubmit={editingItinerary ? handleEditItinerary : handleAddItinerary}
            initialData={editingItinerary}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ItineraryPlannerPage;
