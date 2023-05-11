import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import theme from "../Misc/Theme";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material/styles';

const AccountSummary = ({ loggedInUser }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    background: theme.palette.background.default,
                    p: '1rem'
                }}
            >
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
                        sx={{ gridColumn: "1/1", justifySelf: "center" }}
                        title="Account"
                    />
                    <Typography variant="h5" sx={{ gridColumn: "2/4", ml: 2 }}>
                        {loggedInUser.username}
                    </Typography>
                </Box>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ '.MuiPaper-root:hover': { transform: 'scale(1.05)' }}}>
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
                        <Grid item xs={6} sx={{ '.MuiPaper-root:hover': { transform: 'scale(1.05)' }}}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 'bold', display: "flex", flexDirection: "row-reverse", justifyContent: "flex-start"}}>
                                $ {loggedInUser.balance.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AccountSummary;
