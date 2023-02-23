import AddAddress from "./AddAddress";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import actions from '../store/actions/walletActions';
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';

function Wallet(){
    useEffect(() => {
        actions.loadBtcPrice()
    },[])
    const { walletList, error } = useSelector((state) => state.walletReducer)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: 'gray',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    
    const [open, setError] = useState(error)
    const handleClose = () => {
        setError(false)
        actions.setError(false)
    }

    useEffect(() => {
        setError(typeof error === 'string' ? true : false)
    },[error])
  
    return(
        <div className="center">
            <h2>Bitcoin wallet</h2>
            <Snackbar  anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <AddAddress/>
            <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 815 }}>
                <Table  aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell align="right">Balance</StyledTableCell>
                        <StyledTableCell align="right">USD</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {walletList?.map((row) => (
                        <StyledTableRow key={row.address}>
                            <StyledTableCell component="th" scope="row">
                                {row.address}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.balance} BTC</StyledTableCell>
                            <StyledTableCell align="right">$ {row.usdBalance}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button size="small" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Pagination count={3} defaultPage={1} color="primary" onChange={(e,p) => {console.log(p)}}/>
        </div>
    )
}

export default Wallet