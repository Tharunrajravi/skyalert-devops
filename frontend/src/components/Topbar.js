import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../context/ThemeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Topbar() {
  const { toggleTheme } = useContext(ColorModeContext);

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        backdropFilter: "blur(10px)",
        boxShadow: "none"
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SkyAlert Dashboard
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          <Brightness7 />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
