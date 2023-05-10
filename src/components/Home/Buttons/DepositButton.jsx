import { Button } from "@mui/material";
import { AttachMoney as MoneyIcon } from '@mui/icons-material';
import theme from "../../Misc/Theme";


const DepositButton = ({ handleDepositClick }) => {
    return (
        <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<MoneyIcon />}
            onClick={handleDepositClick}
            sx={{
                color: theme.palette.common.white,
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                    backgroundColor: theme.palette.success.dark,
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
            Deposit
        </Button>
    );
};

export default DepositButton;
