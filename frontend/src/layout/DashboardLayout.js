import { Box, useTheme } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  const theme = useTheme();

  const background =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg,#141e30,#243b55)"
      : "linear-gradient(135deg,#e3f2fd,#ffffff)";

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: background,
          transition: "0.3s"
        }}
      >
        <Topbar />
        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}
