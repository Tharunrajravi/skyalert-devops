import { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signupUser({ email, password });
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };
  
  return (
  <Container style={{ marginTop: "10%", textAlign: "center" }}>
    <Typography variant="h4">Sign Up</Typography>

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
      onClick={handleSignup}
    >
      Create Account
    </Button>

    {/* ⭐ LOGIN LINK */}
    <Typography sx={{ mt: 2 }}>
      Already have an account?{" "}
      <span
        style={{ color: "#00c6ff", cursor: "pointer" }}
        onClick={() => navigate("/login")}
      >
        Login
      </span>
    </Typography>
  </Container>
);
}
