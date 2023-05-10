import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme";

const Home = ({
  handleLogout,
  loggedInUser,
  handleDepositClick,
  handleSendClick,
  handleWithdrawClick,
  handleFriendsClick,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "40px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                height: "100%"
              }}
            >
              <Typography variant="h5" mb={4}>
                Account Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2} sx={{marginTop: '24px'}}>
                <Typography variant="subtitle1" color="textSecondary" sx={{fontSize: '18px', color: theme.palette.text.primary}}>
                  Account Balance
                </Typography>
                <Typography variant="h6">
                  ${loggedInUser.balance.toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2} sx={{marginTop: '24px'}}>
                <Typography variant="subtitle1" color="textSecondary" sx={{fontSize: '18px', color: theme.palette.text.primary}}>
                  Total Transactions
                </Typography>
                <Typography variant="h6">
                  {loggedInUser.transactions
                    ? loggedInUser.transactions.length
                    : 0}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2} sx={{marginTop: '24px'}}>
                <Typography variant="subtitle1" color="textSecondary" sx={{fontSize: '18px', color: theme.palette.text.primary}}>
                  Last Transaction
                </Typography>
                <Typography variant="h6">
                  $
                  {loggedInUser.transactions &&
                    loggedInUser.transactions.length > 0
                    ? loggedInUser.transactions[0].amount.toFixed(2)
                    : "0.00"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                height: "100%",
              }}
            >
              <Typography variant="h5" mb={4}>
                Quick Actions
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSendClick}
                  sx={{
                    minWidth: "200px",
                    marginBottom: "20px",
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.2)`,
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ marginRight: "10px", fontSize: "20px" }}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </Box>
                  Send Money
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleDepositClick}
                  sx={{
                    minWidth: "200px",
                    marginBottom: "20px",
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.success.main,
                    "&:hover": {
                      backgroundColor: theme.palette.success.dark,
                      boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.2)`,
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ marginRight: "10px", fontSize: "20px" }}
                  >
                    <i className="fas fa-money-bill-wave"></i>
                  </Box>
                  Deposit Money
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleWithdrawClick}
                  sx={{
                    minWidth: "200px",
                    marginBottom: "20px",
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.error.main,
                    "&:hover": {
                      backgroundColor: theme.palette.error.dark,
                      boxShadow: `0px 2px 10px rgba(0, 0, 0, 0.2)`,
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ marginRight: "10px", fontSize: "20px" }}
                  >
                    <i className="fas fa-money-bill"></i>
                  </Box>
                  Withdraw Money
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">My Friends</Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleFriendsClick}
            sx={{
              minWidth: "150px",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <i className="fas fa-plus-circle"></i> Add Friend
          </Button>
        </Box>
        <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            marginTop: "20px",
          }}
        >
          <Typography variant="h6" mb={2}>
            You don't have any friends yet.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Click the Add Friend button to find and connect with new friends
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Home;
