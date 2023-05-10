import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../Misc/Theme";
import SendButton from "./Buttons/SendButton";
import WithdrawButton from "./Buttons/WithdrawButton";
import AccountsButton from "./Buttons/AccountsButton";

const QuickActions = ({
    handleSendClick,
    handleDepositClick,
    handleWithdrawClick,
    handleAccountsClick,
}) => {
    return (
        <Box
            sx={{
                padding: "1rem",
                borderRadius: "0.625em",
                boxShadow: "0px 0.125em 0.625em rgba(0, 0, 0, 0.1)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                "@media(max-width: 768px)": { mt: "5vh" },
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gap: "2rem",
                    gridTemplateAreas: `
              "send deposit"
              "withdraw accounts"
            `,
                    "@media(max-width: 768px)": {
                        gridTemplateAreas: `
                "send"
                "deposit"
                "withdraw"
                "accounts"
              `,
                    },
                }}
            >
                <SendButton handleSendClick={handleSendClick} sx={{ width: "100%"}}/>
                <DepositButton handleDepositClick={handleDepositClick} sx={{ width: "100%"}}/>
                <WithdrawButton handleWithdrawClick={handleWithdrawClick} sx={{ width: "100%"}}/>
                <AccountsButton handleAccountsClick={handleAccountsClick} sx={{ width: "100%"}}/>
            </Box>
        </Box>
    );
};

export default QuickActions;
