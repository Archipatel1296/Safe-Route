"use client"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { createTheme } from "@mui/material/styles"
import AppHeader from "@/components/app-header"
import SearchForm from "@/components/search-form"
import MapPlaceholder from "@/components/map-placeholder"

// Create dark theme according to specifications
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#671cd9",
    },
    secondary: {
      main: "#8e63cf",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(135deg, #121212 0%, #1a1a1a 100%)",
          color: "#ffffff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(103, 28, 217, 0.03)",
          },
        },
      },
    },
  },
})

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(110deg, 
                rgba(103, 28, 217, 0.15) 0%, 
                rgba(0, 0, 0, 0) 40%
              ),
              linear-gradient(250deg, 
                rgba(255, 0, 115, 0.15) 0%, 
                rgba(0, 0, 0, 0) 40%
              )
            `,
            zIndex: -1,
          },
          backgroundColor: "#121212",
        }}
      >
        <AppHeader />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <SearchForm />
          <MapPlaceholder />
        </Container>
      </Box>
    </ThemeProvider>
  )
}
