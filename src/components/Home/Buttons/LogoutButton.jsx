import React from "react";
import { Button } from "@mui/material";

const LogoutButton = ({ handleLogout }) => {
  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};
export default LogoutButton;
