import { Paper, useTheme } from "@mui/material";

export default function GlassCard({ children }) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: 3,
        backdropFilter: "blur(10px)",
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.05)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        transition: "0.3s"
      }}
    >
      {children}
    </Paper>
  );
}
