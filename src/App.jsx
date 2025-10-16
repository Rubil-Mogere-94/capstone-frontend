// App.jsx - Updated with better organization
import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import SearchResults from './components/SearchResults'
import Sidebar from './components/Sidebar'
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 240 : 60,
    width: open ? `calc(100% - 240px)` : `calc(100% - 60px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%',
    },
  }),
)

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [hasSearched, setHasSearched] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSearch = (results) => {
    setSearchResults(results)
    setHasSearched(true)
    // Auto-close sidebar on mobile after search
    if (isMobile) {
      setSidebarOpen(false)
    }
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Sidebar - Hidden on mobile by default */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Main Content Area */}
      <Main open={sidebarOpen}>
        {/* Top Bar with unified header */}
        <Box 
          sx={{ 
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Header 
            onMenuToggle={handleDrawerToggle}
            onSearch={handleSearch}
            sidebarOpen={sidebarOpen}
          />
        </Box>

        {/* Page Content */}
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
    </Box>
  )
}

export default App