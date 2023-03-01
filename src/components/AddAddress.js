import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import actions from '../store/actions/walletActions';

function AddAddress(){
    const [address, setAddress] = useState('')
    const [net, setNet] = useState('btc');

    const handleChange = (event) => {
        setNet(event.target.value);
    };
    return(
        <div className='add-address__container'>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '58ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className='row'>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Networks</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={net}
                            label="Choose network"
                            onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value={'btc'}>BTC</MenuItem>
                            <MenuItem value={'eth'}>ETH</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="outlined-required"
                        label={`${net.toLocaleUpperCase()} address`}
                        size="small"
                        className='add-address__input'
                    />
                    <Button variant="contained" className='add-address__button--primary' size="normal" onClick={() => { actions.addAddress(address,net); setAddress('')}}>Add address</Button>
                </div>
            </Box>
        </div>
    )
}

export default AddAddress