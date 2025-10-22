import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// ✅ correct path

const ItineraryList = ({ itineraries, onEdit, onDelete }) => {
  return (
    
    <Box>
     
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Your Itineraries
        </Typography>
        <List>
          {itineraries.map((itinerary) => (
            <Paper key={itinerary.id} sx={{ mb: 2, borderRadius: '8px' }}>
              <ListItem>
                <ListItemText
                  primary={itinerary.title}
                  secondary={`Destination: ${itinerary.destination}, Dates: ${itinerary.startDate} - ${itinerary.endDate}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => onEdit(itinerary)}><EditIcon /></IconButton>
                  <IconButton edge="end" onClick={() => onDelete(itinerary.id)} sx={{ ml: 1 }}><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ItineraryList;
