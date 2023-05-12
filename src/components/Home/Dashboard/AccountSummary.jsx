import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import theme from "../../Misc/Theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material/styles';

const AccountSummary = ({ loggedInUser, isLoading, error }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ background: theme.palette.background.default, p: '1rem' }}>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "1rem",
            borderRadius: '8px 8px 0 0',
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            alignItems: "center",
          }}
        >
          <AccountCircleIcon
            sx={{ gridColumn: "1/1", scale: "4.5", bgcolor: "transparent", color: "secondary.main" }}
            title="Account"
          />
          <Typography variant="h5" sx={{ gridColumn: "2/4", ml: 2}}>
            {loggedInUser.username}
          </Typography>
          {isLoading && <CircularProgress size={20} />}
        </Box>
        {error ? (
          <Typography variant="body1" color="error">
            {error.message}
          </Typography>
        ) : (
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6} >
                <Box display="flex" alignItems="flex-end">
                  <AccountBalanceWalletIcon
                    sx={{ fontSize: "2rem", color: theme.palette.secondary.main }}
                    title="Account balance"
                  />
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ marginLeft: "0.5rem" }}
                  >
                    Account Balance
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 'bold',
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "flex-start",
                  }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={100} />
                  ) : (
                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(loggedInUser.balance)
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AccountSummary;
