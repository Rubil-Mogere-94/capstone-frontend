import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthDetails from './components/AuthDetails';
import ForgotPassword from './components/ForgotPassword';
import ExplorePage from './components/ExplorePage';
import ProfilePage from './components/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import OfflineBanner from './components/OfflineBanner';


import ClimateTravelPage from './components/ClimateTravelPage';
import ItineraryPlannerPage from './components/ItineraryPlannerPage';
import CommunityForumPage from './components/CommunityForumPage';
import RecommendationPage from './components/RecommendationPage';

import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
}));

// Layout component for authenticated routes
const AuthenticatedLayout = () => {
  return (
    <Main>
      <Routes>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        
        
        <Route path="/climate-travel" element={<ClimateTravelPage />} />
        <Route path="/itinerary-planner" element={<ItineraryPlannerPage />} />
        <Route path="/community-forum" element={<CommunityForumPage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>
    </Main>
  );
};

// Layout for signin/signup/forgot password pages
const AuthLayout = ({ children }) => (
  <Main>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {children}
    </Box>
  </Main>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        Loading application...
      </Box>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <CssBaseline />
        <OfflineBanner />
        <Routes>
          {/* Authentication routes */}
          <Route
            path="/signin"
            element={
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            }
          />

          {/* Authenticated user routes */}
          {user ? (
            <Route
              path="/*"
              element={
                <AuthenticatedLayout />
              }
            />
          ) : (
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
