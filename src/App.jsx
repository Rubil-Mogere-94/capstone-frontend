// App.jsx - Updated with better organization
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
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {user ? (
            <Route path="/*" element={
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
                  <Header onSearch={handleSearch} />
                  <AuthDetails />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Hero onSearch={handleSearch} hasSearched={hasSearched} />
                  
                  {hasSearched && (
                    <Box id="search-results" sx={{ py: 4 }}>
                      <SearchResults results={searchResults} />
                    </Box>
                  )}
                </Box>

                <Footer />
              </Main>
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