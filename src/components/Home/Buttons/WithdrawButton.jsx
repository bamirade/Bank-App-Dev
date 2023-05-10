import { Button } from "@mui/material";
import { MoneyOff as MoneyOffIcon } from '@mui/icons-material';
import theme from "../../Misc/Theme";


const WithdrawButton = ({ handleWithdrawClick }) => {
    return (
        <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<MoneyOffIcon />}
            onClick={handleWithdrawClick}
            sx={{
                color: theme.palette.common.white,
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                    backgroundColor: theme.palette.error.dark,
                    boxShadow: `0px 0.125em 0.625em rgba(0, 0, 0, 0.2)`,
                    transform: "scale(1.05)",
                },
                fontSize: '1rem',
                borderRadius: '0.375em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
        >
            Withdraw
        </Button>
    );
};

export default WithdrawButton;
