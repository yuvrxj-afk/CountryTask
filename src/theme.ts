import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000", // Black
    },
    secondary: {
      main: "#2196f3", // Blue
    },
    background: {
      paper: "#111", // Darker shade of Black for paper background
    },
    text: {
      primary: "#fff", // White
      secondary: "#000",
    },
  },
  typography: {
    fontFamily: "'Poppins'",
  },
});

export default theme;
