import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: "center", marginTop: "15%" }}>
      <Typography variant="h2" gutterBottom>
        SkyAlert Pro 🌦️
      </Typography>

      <Typography variant="h5" gutterBottom>
        Get weather alerts before the rain hits you.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/dashboard")}
      >
        Get Started
      </Button>
    </Container>
  );
}
