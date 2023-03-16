import AddAddress from "../components/AddAddress";
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
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Header from '../components/Header';

function Wallet() {
    useEffect(() => {
        actions.loadUSDPrice()
    }, [])
    const { walletList, error } = useSelector((state) => state.walletReducer);
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
    }, [error])

    const [pageList, setPageList] = useState([]);
    const [pageLength, setPageLength] = useState(1);
    const [pageActive, setPageActive] = useState(1);
    const [totalUsd, setTotalUsd] = useState(0);
    const [dragUsd, setDragUsd] = useState(0);

    useEffect(() => {
        let pgs = Math.ceil(walletList.length / 3);
        setPageLength(pgs);

        let sum = 0;
        walletList?.forEach(elem => {
            sum += elem.usdBalance
        });
        setTotalUsd(sum.toFixed(2));
    }, [walletList])

    useEffect(() => {
        let page = pageActive * 3
        let listActive = walletList.slice((page - 3), page)
        if (listActive.length === 0 && walletList.length > 0) {
            setPageActive(pageActive - 1)
        }
        setPageList(listActive)
    }, [pageActive, walletList])

    const [value, setValue] = useState('all');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue !== 'all') {
            setPageList(walletList.filter(elem => elem.net === newValue))
        } else {
            setPageList(walletList)
        }
    };
    function allowDrop(ev) {
        ev.preventDefault();
    }
      
    function drag(e, data) {
        e.dataTransfer.setData("text", JSON.stringify(data));
    }
    
    function drop(ev) {
        ev.preventDefault();
        var data = JSON.parse(ev.dataTransfer.getData("text"));
        setDragUsd(dragUsd + data.usdBalance);
    }

    return (
        <div className="center">
            <Header balance={totalUsd}/>
            <div className="wallet-container center">
                <h2>Bitcoin wallet</h2>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
                <AddAddress />
                <Box sx={{ minWidth: 300, maxWidth: 815 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example" textColor="primary" indicatorColor="primary">
                        <Tab label="All" value="all" />
                        <Tab label="BTC" value="btc" />
                        <Tab label="ETH" value="eth" />
                    </Tabs>
                </Box>
                <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: '100%' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell align="right">Balance</StyledTableCell>
                                <StyledTableCell align="right">USD</StyledTableCell>
                                <StyledTableCell align="right">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pageList?.map((row) => (
                                <StyledTableRow key={row.address} draggable="true" onDragStart={(e) => drag(e,row)}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.address}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.balance.toFixed(6)} {row.net?.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell align="right">$ {row.usdBalance.toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size="small" variant="outlined" startIcon={<DeleteIcon />}
                                            onClick={() => actions.deleteItem(row.address)}>Delete</Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <TableRow >
                                <TableCell rowSpan={3} colSpan={2} align='center' scope="row">
                                    <h3>Total USD sum: </h3>
                                </TableCell>
                                <TableCell rowSpan={10} align='right' scope="row">
                                    $ {totalUsd}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                {
                    pageList.length ? <Pagination count={pageLength} page={pageActive} sx={{ alignSelf: 'center' }} defaultPage={1} color="primary" onChange={(e, p) => { setPageActive(p) }} /> : ''
                }
                <Box 
                    sx={{width: '70%', height:'10vh', border: '1px solid grey', marginTop: '30px', paddingLeft: "20px"}} 
                    className="center" 
                    onDrop={(event) => drop(event)} 
                    onDragOver={(event) => allowDrop(event)}
                >
                    <h4>Balance: ${dragUsd.toFixed(2)}</h4>
                </Box>
            </div>
        </div>
    )
}

export default Wallet