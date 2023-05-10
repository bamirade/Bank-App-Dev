import React, { useState } from "react";
import SignUp from "./SignUp";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import BoltIcon from '@mui/icons-material/Bolt';
import theme from '../Theme';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  const handleSignUp = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = users.some((user) => user.username === username);
    if (alreadyExists) {
      alert("Username already exists");
    } else {
      users.push({ username, password, balance: 0 });
      localStorage.setItem("users", JSON.stringify(users));
      setShowSignUp(false);
      handleLogin(username, password);
    }
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };

  const handleBack = () => {
    setShowSignUp(false);
  };

  if (showSignUp) {
    return <SignUp handleSignUp={handleSignUp} handleBack={handleBack} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <BoltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Button type="button" onClick={handleShowSignUp} fullWidth variant="outlined">
              Sign Up Now
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
