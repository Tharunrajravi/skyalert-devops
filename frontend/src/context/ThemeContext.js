import { createContext, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export const ColorModeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#00c6ff"
      }
    }
  });

  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />   
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
