import { Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function AlertCard({ city, email }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
    >
      <GlassCard>
        <Typography variant="h6">🌍 {city}</Typography>
        <Typography variant="body2">📧 {email}</Typography>
      </GlassCard>
    </motion.div>
  );
}
