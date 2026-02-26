import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };
  
  return (
  <Container style={{ marginTop: "10%", textAlign: "center" }}>
    <Typography variant="h4">Login</Typography>

    <TextField
      label="Email"
      fullWidth
      margin="normal"
      onChange={(e) => setEmail(e.target.value)}
    />

    <TextField
      label="Password"
      type="password"
      fullWidth
      margin="normal"
      onChange={(e) => setPassword(e.target.value)}
    />

    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 2 }}
      onClick={handleLogin}
    >
      Login
    </Button>

    {/* ⭐ SIGNUP LINK */}
    <Typography sx={{ mt: 2 }}>
      Don't have an account?{" "}
      <span
        style={{ color: "#00c6ff", cursor: "pointer" }}
        onClick={() => navigate("/signup")}
      >
        Create one
      </span>
    </Typography>
  </Container>
);

}
