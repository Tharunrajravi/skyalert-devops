import { Box, Typography } from "@mui/material";
import { FaCloudSunRain, FaBell } from "react-icons/fa";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        background: "linear-gradient(180deg,#0f2027,#203a43,#2c5364)",
        color: "white",
        p: 3
      }}
    >
      <Typography variant="h5" sx={{ mb: 5 }}>
        SkyAlert 🌦️
      </Typography>

      <Typography sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FaCloudSunRain style={{ marginRight: 10 }} /> Dashboard
      </Typography>

      <Typography sx={{ display: "flex", alignItems: "center" }}>
        <FaBell style={{ marginRight: 10 }} /> Alerts
      </Typography>
    </Box>
  );
}
