import React, { useState } from "react";
import { Box, Grid, Snackbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MuiAlert from '@mui/material/Alert';
import { AccountBalance, AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import theme from "../Misc/Theme";
import AccountSummary from "./AccountSummary";
import QuickActions from "./QuickActions";
import LogoutButton from "./Buttons/LogoutButton";
import Deposit from "./Pages/Deposit";
import Withdraw from "./Pages/Withdraw";

const Home = ({ handleLogout, loggedInUser }) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDepositSubmit = () => {
    setShowDeposit(false);
    setAmount("");
    setOpenSnackbar(true);
    setSnackbarSeverity("success");
    setSnackbarMessage("Deposit successful!");
  };

  const handleWithdrawSubmit = () => {
    setShowWithdraw(false);
    setAmount("");
    setOpenSnackbar(true);
    setSnackbarSeverity("success");
    setSnackbarMessage("Withdrawal successful!");
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "1.75rem" }}>
        {showDeposit && (
          <Deposit
            handleDepositSubmit={handleDepositSubmit}
            setAmount={setAmount}
            amount={amount}
            loggedInUser={loggedInUser}
            setShowDeposit={setShowDeposit}
            handleSnackbarClose={handleSnackbarClose}
          />
        )}
        {showWithdraw && (
          <Withdraw
            handleWithdrawSubmit={handleWithdrawSubmit}
            setAmount={setAmount}
            amount={amount}
            loggedInUser={loggedInUser}
            setShowWithdraw={setShowWithdraw}
            handleSnackbarClose={handleSnackbarClose}
          />
        )}
        {!showDeposit && !showWithdraw && (
          <Grid container spacing={3} alignItems="stretch" height="100%">
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid gray', borderRadius: '8px', p: '1rem', minimumHeight: '35vh' }}>
                <Typography variant="h5" component="h2" >Account Summary</Typography>
                <AccountSummary loggedInUser={loggedInUser} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid gray', borderRadius: '8px', p: '1rem', minimumHeight: '35vh' }}>
                <Typography variant="h5" component="h2" mb={2}>Quick Actions</Typography>
                <QuickActions
                  handleDepositClick={() => setShowDeposit(true)}
                  handleWithdrawClick={() => setShowWithdraw(true)}
                  depositIcon={<AddCircleOutline />}
                  withdrawIcon={<RemoveCircleOutline />}
                />
              </Box>
            </Grid>

          </Grid>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
          <LogoutButton handleLogout={handleLogout} />
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
