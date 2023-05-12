import React from "react";
import { Button } from "@mui/material";
import theme from "../../Misc/Theme";
import { ThemeProvider } from "@mui/material/styles";

const LogoutButton = ({ handleLogout }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </ThemeProvider>
  );
};
export default LogoutButton;
