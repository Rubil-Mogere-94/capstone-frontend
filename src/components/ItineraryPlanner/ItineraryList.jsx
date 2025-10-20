import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItineraryList = ({ itineraries, onEdit, onDelete }) => {
  return (
    <List>
      {itineraries.map((itinerary) => (
        <Paper key={itinerary.id} elevation={1} sx={{ mb: 2, borderRadius: '8px' }}>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="h6" component="span">
                  {itinerary.title}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography component="div" variant="body2" color="text.secondary">
                    Destination: {itinerary.destination}
                  </Typography>
                  <Typography component="div" variant="body2" color="text.secondary">
                    Dates: {itinerary.startDate} to {itinerary.endDate}
                  </Typography>
                  {itinerary.notes && (
                    <Typography component="div" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Notes: {itinerary.notes}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(itinerary)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(itinerary.id)} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default ItineraryList;
