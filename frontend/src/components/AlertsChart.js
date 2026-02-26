import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import GlassCard from "./GlassCard";
import { Typography, useTheme } from "@mui/material";

export default function AlertsChart({ alerts }) {
  const theme = useTheme();

  const data = alerts.map((alert, index) => ({
    name: `Alert ${index + 1}`,
    count: index + 1
  }));

  const textColor =
    theme.palette.mode === "dark" ? "#ffffff" : "#000000";

  return (
    <GlassCard>
      <Typography variant="h6" mb={2}>
        Alerts Growth 📈
      </Typography>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#00c6ff"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
