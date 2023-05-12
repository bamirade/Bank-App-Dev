import React, { useState } from "react";
import Login from "./components/Auth/Login.jsx";
import Home from "./components/Home/Home.jsx";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Misc/Theme.jsx";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  const handleLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (matchedUser) {
      setLoggedInUser(matchedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.background.main,
          "@media(min-width:769px)": { minHeight: "100vh" },
        }}
      >
        {loggedInUser ? (
          <Home handleLogout={handleLogout} loggedInUser={loggedInUser} />
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
