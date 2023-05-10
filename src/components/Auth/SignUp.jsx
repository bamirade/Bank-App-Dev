import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import BoltIcon from '@mui/icons-material/Bolt';
import theme from '../Theme';

const SignUp = ({ handleSignUp, handleBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.length) {
      alert(`Username not allowed`);
      return;
    }

    if (!password.length) {
      alert(`Password not allowed`);
      return;
    }

    handleSignUp(username, password);
    setShowDeposit(false);
    setShowTransfer(false);
  };
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
            Sign up
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
            <FormControlLabel
              control={
                <Checkbox
                  value="agree"
                  color="primary"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  By clicking Sign Up, you agree to our{" "}
                  <Link href="#" color="secondary">
                    Terms
                  </Link>{", "}
                  <Link href="#" color="secondary">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="#" color="secondary">
                    Cookies Policy
                  </Link>
                </Typography>
              }
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isChecked || !username || !password}>
              Sign Up
            </Button>
            <Button type="button" onClick={handleBack} fullWidth variant="outlined">
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;