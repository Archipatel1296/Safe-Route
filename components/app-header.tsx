"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MapIcon from "@mui/icons-material/Map"
import SearchIcon from "@mui/icons-material/Search"
import InfoIcon from "@mui/icons-material/Info"
import HelpIcon from "@mui/icons-material/Help"

export default function AppHeader() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(30, 30, 30, 0.95)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo and App Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #671cd9 0%, #8e63cf 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <MapIcon sx={{ color: "#ffffff" }} />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: "#ffffff",
            }}
          >
            ROUTE FINDER
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
          }}
        >
          <Button
            color="inherit"
            startIcon={<SearchIcon />}
            sx={{
              color: "#cccccc",
              "&:hover": {
                color: "#ffffff",
                background: "rgba(103, 28, 217, 0.1)",
              },
            }}
          >
            Search
          </Button>
          <Button
            color="inherit"
            startIcon={<MapIcon />}
            sx={{
              color: "#cccccc",
              "&:hover": {
                color: "#ffffff",
                background: "rgba(103, 28, 217, 0.1)",
              },
            }}
          >
            Map
          </Button>
          <Button
            color="inherit"
            startIcon={<InfoIcon />}
            sx={{
              color: "#cccccc",
              "&:hover": {
                color: "#ffffff",
                background: "rgba(103, 28, 217, 0.1)",
              },
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            startIcon={<HelpIcon />}
            sx={{
              color: "#cccccc",
              "&:hover": {
                color: "#ffffff",
                background: "rgba(103, 28, 217, 0.1)",
              },
            }}
          >
            Help
          </Button>
        </Box>

        {/* Mobile Menu Icon (simplified for this example) */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Button
            color="inherit"
            sx={{
              minWidth: "auto",
              p: 1,
              color: "#cccccc",
              "&:hover": {
                color: "#ffffff",
                background: "rgba(103, 28, 217, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 24,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  height: "2px",
                  width: "100%",
                  backgroundColor: "currentColor",
                }}
              />
              <Box
                sx={{
                  height: "2px",
                  width: "100%",
                  backgroundColor: "currentColor",
                }}
              />
              <Box
                sx={{
                  height: "2px",
                  width: "100%",
                  backgroundColor: "currentColor",
                }}
              />
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
