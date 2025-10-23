import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareItineraryButton from './ShareItineraryButton'; // ✅ correct import

const ItineraryList = ({ itineraries, onEdit, onDelete }) => {
  return (
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
              <ListItemSecondaryAction sx={{ display: 'flex', gap: 1 }}>
                {/* ✅ Share Button here */}
                <ShareItineraryButton itinerary={itinerary} />
                
                <IconButton edge="end" onClick={() => onEdit(itinerary)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => onDelete(itinerary.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default ItineraryList;
