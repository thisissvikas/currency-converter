import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import App from "./App";

// Define a theme (optional)
const theme = createTheme({
  palette: {
    primary: { main: "#007bff" }, // Change this as needed
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resets default browser styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
