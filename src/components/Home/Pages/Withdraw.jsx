import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import theme from "../../Misc/Theme";

const Withdraw = ({ handleWithdrawSubmit, loggedInUser, setShowWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= loggedInUser.balance) {
      loggedInUser.balance -= parsedAmount;
      const users = JSON.parse(localStorage.getItem("users"));
      const userIndex = users.findIndex(user => user.username === loggedInUser.username);
      const updatedUser = {
        ...loggedInUser,
        balance: loggedInUser.balance
      };
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      
      handleWithdrawSubmit(parsedAmount);
      setAmount("");
      setShowWithdraw(false);
      setOpenSnackbar(true);
      setSnackbarSeverity('success');
      setSnackbarMessage('Withdrawal successful!');
    } else {
      setOpenSnackbar(true);
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid amount!');
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  const handleCancel = () => {
    setShowWithdraw(false);
  }

  

  return (
    <Box
      sx={{
        padding: "1rem",
        borderRadius: "0.625em",
        boxShadow: "0px 0.125em 0.625em rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" mb={2}>
        Withdraw Money
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              id="amount"
              type="number"
              variant="outlined"
              label="Amount"
              value={amount}
              onChange={handleChange}
              fullWidth
              InputProps={{
                inputProps: { min: "0", step: "0.01" },
              }}
              sx={{ marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Withdraw
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="button" variant="outlined" onClick={handleCancel} fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Withdraw;
