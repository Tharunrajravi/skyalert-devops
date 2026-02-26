import { useState } from "react";
import {
  Modal, Box, Typography, TextField, Button, MenuItem
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  color: "white"
};

export default function AddAlertModal({ open, handleClose, addAlert }) {
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("rain");
  const [threshold, setThreshold] = useState("");

  const handleSubmit = () => {
    addAlert({ city, email, type, threshold });
    setCity("");
    setEmail("");
    setThreshold("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" mb={2}>
          Add Weather Alert 🌦️
        </Typography>

        <TextField label="City Name" fullWidth margin="normal"
          value={city} onChange={(e) => setCity(e.target.value)} />

        <TextField label="Email" fullWidth margin="normal"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField select label="Alert Type" fullWidth margin="normal"
          value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="rain">Rain Alert</MenuItem>
          <MenuItem value="temp">Temperature Alert</MenuItem>
        </TextField>

        {type === "temp" && (
          <TextField
            label="Temperature Threshold °C"
            fullWidth
            margin="normal"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />
        )}

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Save Alert
        </Button>
      </Box>
    </Modal>
  );
}
