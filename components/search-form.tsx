"use client"

import { useState } from "react"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import InputAdornment from "@mui/material/InputAdornment"
import Paper from "@mui/material/Paper"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import DirectionsIcon from "@mui/icons-material/Directions"

export default function SearchForm() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")

  const handleSwapLocations = () => {
    const temp = fromLocation
    setFromLocation(toLocation)
    setToLocation(temp)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: "rgba(30, 30, 30, 0.8)",
        borderRadius: "12px",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          boxShadow: "0 4px 20px rgba(103, 28, 217, 0.1)",
        },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="From Location"
            variant="outlined"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon
                    sx={{
                      color: "#8e63cf",
                      transition: "color 0.3s ease",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(20, 20, 20, 0.4)",
                "& fieldset": {
                  borderColor: "rgba(142, 99, 207, 0.2)",
                  transition: "border-color 0.3s ease",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(142, 99, 207, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#671cd9",
                  borderWidth: "2px",
                },
                "&:hover": {
                  backgroundColor: "rgba(20, 20, 20, 0.6)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(103, 28, 217, 0.1)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#cccccc",
                "&.Mui-focused": {
                  color: "#8e63cf",
                },
              },
              "& .MuiInputBase-input": {
                padding: "14px 14px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleSwapLocations}
              sx={{
                backgroundColor: "rgba(103, 28, 217, 0.1)",
                color: "#8e63cf",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(103, 28, 217, 0.2)",
                  color: "#ffffff",
                  transform: "rotate(180deg)",
                },
                width: 40,
                height: 40,
              }}
            >
              <SwapVertIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="To Location"
            variant="outlined"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlinedIcon
                    sx={{
                      color: "#8e63cf",
                      transition: "color 0.3s ease",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                transition: "all 0.3s ease",
                backgroundColor: "rgba(20, 20, 20, 0.4)",
                "& fieldset": {
                  borderColor: "rgba(142, 99, 207, 0.2)",
                  transition: "border-color 0.3s ease",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(142, 99, 207, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#671cd9",
                  borderWidth: "2px",
                },
                "&:hover": {
                  backgroundColor: "rgba(20, 20, 20, 0.6)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(103, 28, 217, 0.1)",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#cccccc",
                "&.Mui-focused": {
                  color: "#8e63cf",
                },
              },
              "& .MuiInputBase-input": {
                padding: "14px 14px",
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<DirectionsIcon />}
            sx={{
              backgroundColor: "#671cd9",
              color: "white",
              borderRadius: "12px",
              padding: "10px 24px",
              textTransform: "none",
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#8e63cf",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(103, 28, 217, 0.2)",
              },
            }}
          >
            Find Route
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
