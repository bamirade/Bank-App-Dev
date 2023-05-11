import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Snackbar,
    Autocomplete,
    InputLabel
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import theme from "../../Misc/Theme";

const Send = ({ handleSendSubmit, loggedInUser, setShowSend }) => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")).filter(user => user.username !== loggedInUser.username));
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [recipientError, setRecipientError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    const handleChangeRecipient = (event, value) => {
        if (!value) {
            setRecipient("");
            setRecipientError(true);
        } else {
            setRecipient(value.username);
            setRecipientError(false);
        }
    };

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
        setAmountError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let validationError = false;
        const parsedAmount = parseFloat(amount);

        if (!recipient) {
            setRecipientError(true);
            setSnackbarMessage('Recipient is required');
            setSnackbarSeverity('error');
            validationError = true;
        } else {
            setRecipientError(false);
        }

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setAmountError(true);
            setSnackbarMessage('Invalid amount');
            setSnackbarSeverity('error');
            validationError = true;
        } else if (parsedAmount > loggedInUser.balance) {
            setAmountError(true);
            setSnackbarMessage('Insufficient balance');
            setSnackbarSeverity('warning');
            validationError = true;
        } else {
            setAmountError(false);
        }

        if (!validationError) {
            const recipientUser = JSON.parse(localStorage.getItem("users")).find(user => user.username === recipient);
            if (recipientUser) {
                loggedInUser.balance -= parsedAmount;
                recipientUser.balance += parsedAmount;

                const users = JSON.parse(localStorage.getItem("users"));
                const loggedInUserIndex = users.findIndex(user => user.username === loggedInUser.username);
                const updatedLoggedInUser = {
                    ...loggedInUser,
                    balance: loggedInUser.balance
                };
                users[loggedInUserIndex] = updatedLoggedInUser;

                const recipientUserIndex = users.findIndex(user => user.username === recipientUser.username);
                users[recipientUserIndex] = recipientUser;

                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));

                handleSendSubmit(parsedAmount, recipientUser.username);
                setRecipient("");
                setAmount("");
                setShowSend(false);
                setOpenSnackbar(true);
                setSnackbarSeverity('success');
                setSnackbarMessage(`Successfully sent $${parsedAmount} to ${recipientUser.username}!`);
            } else {
                setOpenSnackbar(true);
                setSnackbarSeverity('error');
                setSnackbarMessage('Recipient not found!');
            }
        } else {
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

    const handleCancel = () => {
        setShowSend(false);
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
                Send Money
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <InputLabel htmlFor="recipient">Recipient</InputLabel>
                        <Autocomplete
                            id="recipient"
                            options={users}
                            getOptionLabel={(option) => option ? option.username : ''}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                            InputProps={{
                                error: recipientError,
                                helperText: recipientError ? 'Recipient is required' : '',
                            }}
                            value={users.find(user => user.username === recipient) || ""}
                            onChange={handleChangeRecipient}
                            fullWidth
                            autoSelect
                            disableClearable
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="amount"
                            type="number"
                            variant="outlined"
                            label="Amount"
                            value={amount}
                            onChange={handleChangeAmount}
                            fullWidth
                            InputProps={{
                                inputProps: { min: "0", step: "0.01" },
                                error: amountError,
                                helperText: amountError ? 'Invalid amount' : '',
                            }}
                            sx={{ marginBottom: "1rem" }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Send
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

export default Send;

