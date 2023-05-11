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
  TableSortLabel
} from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" component="h2" mb={2}>
        Accounts
      </Typography>

      <TableContainer sx={{ width: "100%", marginBottom: "2rem" }}>
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
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginRight: "1rem" }}
          />
          {filteredData.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No results found
            </Typography>
          )}
        </div>

        <Button onClick={handleAccountsClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default Accounts;
