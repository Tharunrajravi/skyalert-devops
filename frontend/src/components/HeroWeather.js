import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function HeroWeather() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GlassCard>
        <Typography variant="h4" mb={2}>
          🌤️ Stay Ahead of Weather
        </Typography>

        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {time}
        </Typography>

        <Typography mt={2}>
          “The best time to carry an umbrella is before it rains.”
        </Typography>

        <img
          src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
          alt="weather"
          style={{ width: "200px", marginTop: "20px" }}
        />
      </GlassCard>
    </motion.div>
  );
}
