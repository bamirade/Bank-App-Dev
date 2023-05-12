import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Grid,
  Paper,
  TableSortLabel,
  IconButton
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import theme from "../../Misc/Theme";
import { ThemeProvider } from "@mui/material/styles";

const Accounts = ({ handleAccountsClose }) => {
  const userData = JSON.parse(localStorage.getItem("users"));

  const [sortBy, setSortBy] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [searchTerm, setSearchTerm] = React.useState("");

  const sortedData = React.useMemo(() => {
    if (sortBy === null) {
      return userData;
    }

    return [...userData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    });
  }, [userData, sortBy, sortOrder]);

  const filteredData = React.useMemo(() => {
    if (searchTerm === "") {
      return sortedData;
    }

    return sortedData.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedData, searchTerm]);

  const renderRows = () => {
    return filteredData.map((user, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{user.username}</TableCell>
          <TableCell align="right">$ {user.balance.toFixed(2)}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box mt={4} mb={2}>
          <Typography variant="h5" component="h2">Accounts</Typography>
        </Box>

        <TableContainer component={Paper} sx={{ width: "100%", marginBottom: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "username"}
                    direction={sortOrder}
                    onClick={() => {
                      setSortBy("username");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    User
                    {sortBy === 'username' && (
                      <IconButton size="small">
                        {sortOrder === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    )}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortBy === "balance"}
                    direction={sortOrder}
                    onClick={() => {
                      setSortBy("balance");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    Balance
                    {sortBy === 'balance' && (
                      <IconButton size="small">
                        {sortOrder === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    )}
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredData.length === 0 && (
                <Typography variant="subtitle1" color="text.secondary" mt={1}>
                  No results found
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleAccountsClose} variant="contained" color="primary">
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Accounts;
