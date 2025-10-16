// App.jsx - Updated with proper authentication layout
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import SearchResults from './components/SearchResults'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AuthDetails from './components/AuthDetails'
import ForgotPassword from './components/ForgotPassword'
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from './firebase'

const Main = styled('main')(
  ({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    width: '100%',
  }),
)

// Layout component for authenticated routes
const AuthenticatedLayout = ({ children, onSearch, hasSearched, searchResults }) => {
  return (
    <Main>
      <Box 
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 2,
        }}
      >
        <Header onSearch={onSearch} />
        <AuthDetails />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Hero onSearch={onSearch} hasSearched={hasSearched} />
        
        {hasSearched && (
          <Box id="search-results" sx={{ py: 4 }}>
            <SearchResults results={searchResults} />
          </Box>
        )}
      </Box>

      <Footer />
    </Main>
  );
};

// Layout component for authentication pages (signin, signup, forgot password)
const AuthLayout = ({ children }) => {
  return (
    <Main>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%'
      }}>
        {children}
      </Box>
    </Main>
  );
};

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [hasSearched, setHasSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])

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

  const handleSearch = (results) => {
    setSearchResults(results)
    setHasSearched(true)
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading application...</Box>;
  }

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        <CssBaseline />
        
        <Routes>
          {/* Authentication routes with AuthLayout */}
          <Route path="/signin" element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          } />
          <Route path="/signup" element={
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          } />
          <Route path="/forgot-password" element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          } />
          
          {/* Main app routes with AuthenticatedLayout */}
          {user ? (
            <Route path="/*" element={
              <AuthenticatedLayout 
                onSearch={handleSearch} 
                hasSearched={hasSearched} 
                searchResults={searchResults} 
              />
            } />
          ) : (
            <Route path="/*" element={<Navigate to="/signin" replace />} />
          )}
        </Routes>
      </Box>
    </Router>
  )
}

export default App