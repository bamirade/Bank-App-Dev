import React, { useState, useEffect } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    IconButton,
    Button,
    Snackbar,
    Typography
} from "@mui/material";
import { Edit, Delete, Add, Save } from "@mui/icons-material";
import theme from "../../Misc/Theme";
import { ThemeProvider } from "@mui/material/styles";

const Budget = ({ loggedInUser, setTotalBudget }) => {
    const [budgetItems, setBudgetItems] = useState(
        JSON.parse(localStorage.getItem(`budget-${loggedInUser.username}`)) || []
    );
    const [editingIndex, setEditingIndex] = useState(null);
    const [newName, setNewName] = useState("");
    const [newCost, setNewCost] = useState("");
    const [newItemName, setNewItemName] = useState("");
    const [newItemCost, setNewItemCost] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(`budget-${loggedInUser.username}`, JSON.stringify(budgetItems));
        const totalBudget = getTotalBudget();
        setTotalBudget(totalBudget);
      }, [budgetItems]);
      
    const handleAddItem = () => {
        const newItem = { name: newItemName, cost: newItemCost };
        setBudgetItems([...budgetItems, newItem]);
        setNewItemName("");
        setNewItemCost("");
        setSnackbarMessage("Item added successfully.");
        setSnackbarOpen(true);
    };

    const handleEditItem = (index) => {
        const updatedItem = { ...budgetItems[index], name: newName, cost: newCost };
        const updatedBudgetItems = [...budgetItems];
        updatedBudgetItems.splice(index, 1, updatedItem);
        setBudgetItems(updatedBudgetItems);
        setEditingIndex(null);
        setNewName("");
        setNewCost("");
        setSnackbarMessage("Item updated successfully.");
        setSnackbarOpen(true);
    };

    const handleDeleteItem = (index) => {
        const newBudgetItems = [...budgetItems];
        newBudgetItems.splice(index, 1);
        setBudgetItems(newBudgetItems);
        setSnackbarMessage("Item deleted successfully.");
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const getTotalBudget = () => {
        let total = 0;
        budgetItems.forEach((item) => {
          total += item.cost;
        });
        return loggedInUser.balance-total;
      };
      

    return (
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Expense Name</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">Cost</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="h6">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgetItems.map((item, index) => (
                            <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                <TableCell>
                                    {editingIndex === index ? (
                                        <TextField
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            fullWidth
                                            label="Expense Name"
                                            variant="standard"
                                            size="small"
                                            required
                                        />
                                    ) : (
                                        item.name
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editingIndex === index ? (
                                        <TextField
                                            type="number"
                                            value={newCost.toString()}
                                            onChange={(e) => setNewCost(Number(e.target.value))}
                                            fullWidth
                                            label="Cost"
                                            variant="standard"
                                            size="small"
                                            required
                                        />
                                    ) : (
                                        `$${item.cost.toFixed(2)}`
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    {editingIndex === index ? (
                                        <>
                                            <IconButton onClick={() => handleEditItem(index)}>
                                                <Save />
                                            </IconButton>
                                            <IconButton onClick={() => setEditingIndex(null)}>
                                                <Delete />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => handleDeleteItem(index)}>
                                                <Delete />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    setNewName(item.name);
                                                    setNewCost(item.cost);
                                                    setEditingIndex(index);
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                            <TableCell>
                                <TextField
                                    label="Add expense"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    required
                                />
                            </TableCell>
                            <TableCell align="right">
                                <TextField
                                    label="Amount"
                                    type="number"
                                    value={newItemCost}
                                    onChange={(e) => setNewItemCost(Number(e.target.value))}
                                    fullWidth
                                    variant="standard"
                                    size="small"
                                    required
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    disabled={!newItemName || !newItemCost}
                                    onClick={handleAddItem}
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </ThemeProvider>
    );
};

export default Budget;
