import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Container,
  styled
} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  border: 0,
  borderRadius: 8,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  transition: '0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .5)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: theme.palette.grey[400],
    color: theme.palette.grey[600],
    boxShadow: 'none',
  }
}));

const RecommendationPage = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    setRecommendations('');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

      const fullPrompt = `Given the following user preference: "${prompt}", recommend places to visit that have low population density and minimal environmental impact. Focus on sustainable travel and unique, less-traveled destinations. Provide a short description for each. Format the output clearly with headings for each recommendation.`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      setRecommendations(text);
    } catch (err) {
      console.error("Error generating recommendations:", err);
      setError("Failed to generate recommendations. Please ensure your API key is valid and try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          <TravelExploreIcon sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
          Sustainable Travel AI
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Tell us your travel preferences, and our AI will suggest unique, less-crowded destinations with minimal environmental impact.
        </Typography>

        <TextField
          label="Your Travel Preferences"
          multiline
          rows={5}
          fullWidth
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'I love hiking and nature, looking for a quiet escape in Europe.' or 'Interested in cultural experiences in Asia, avoiding crowded tourist spots.'"
          sx={{ mb: 3 }}
        />

        <GradientButton
          onClick={getRecommendations}
          disabled={loading || !prompt.trim()}
          fullWidth
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TravelExploreIcon />}
        >
          {loading ? 'Generating Recommendations...' : 'Get AI Recommendations'}
        </GradientButton>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {recommendations && (
        <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            Our AI's Sustainable Suggestions:
          </Typography>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            {recommendations}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default RecommendationPage;
