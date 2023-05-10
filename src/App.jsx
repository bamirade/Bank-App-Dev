import React, { useState } from "react";
import Login from "./components/Auth/Login.jsx";
import Home from "./components/Home/Home.jsx";
import { Box } from "@mui/material";

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
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
      {loggedInUser ? (
        <Home handleLogout={handleLogout} loggedInUser={loggedInUser} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
      </Box>
    </div>
  );
};

export default App;
