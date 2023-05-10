import { Button } from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import theme from "../../Misc/Theme";


const AccountsButton = ({ handleAccountsClick }) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<PersonSearchIcon />}
            onClick={handleAccountsClick}
            sx={{
                transition: "0.2s",
                "&:hover": {
                    transform: "scale(1.05)",
                },
                fontSize: '1em',
                borderRadius: '0.625em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
        >
            Accounts
        </Button>
    );
};

export default AccountsButton;
