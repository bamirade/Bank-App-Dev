import { Button } from "@mui/material";
import { Send as SendIcon } from '@mui/icons-material';
import theme from "../../Misc/Theme";
import { ThemeProvider } from "@mui/material/styles";


const SendButton = ({ handleSendClick }) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SendIcon />}
                onClick={handleSendClick}
                sx={{
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
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
                Send
            </Button>
        </ThemeProvider>
    );
};

export default SendButton;
