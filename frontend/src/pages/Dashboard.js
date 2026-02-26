import { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Grid, Button } from "@mui/material";
import AddAlertModal from "../components/AddAlertModal";
import AlertCard from "../components/AlertCard";
import AlertsChart from "../components/AlertsChart";
import HeroWeather from "../components/HeroWeather";
import { getAlerts, addAlert as addAlertAPI } from "../services/api";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts from backend
  const fetchAlerts = async () => {
    const res = await getAlerts();
    setAlerts(res.data);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Add alert to backend
  const addAlert = async (alert) => {
    await addAlertAPI(alert);
    fetchAlerts();
  };

  return (
    <DashboardLayout>
      {/* Add Alert Button */}
      <Button
        variant="contained"
        sx={{
          mb: 3,
          background: "linear-gradient(45deg,#00c6ff,#0072ff)",
          boxShadow: "0 4px 15px rgba(0,114,255,0.4)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,114,255,0.6)"
          }
        }}
        onClick={() => setOpen(true)}
      >
        Add Weather Alert
      </Button>

      {/* Main Layout */}
      <Grid container spacing={3}>
        
        {/* LEFT SIDE CONTENT */}
        <Grid item xs={8}>
          <AlertsChart alerts={alerts} />

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {alerts.map((alert, index) => (
              <Grid item xs={6} key={index}>
                <AlertCard city={alert.city} email={alert.email} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* RIGHT SIDE HERO PANEL */}
        <Grid item xs={4}>
          <HeroWeather />
        </Grid>

      </Grid>

      {/* Modal */}
      <AddAlertModal
        open={open}
        handleClose={() => setOpen(false)}
        addAlert={addAlert}
      />
    </DashboardLayout>
  );
}
