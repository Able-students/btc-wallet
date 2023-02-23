import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import actions from '../store/actions/walletActions';

function AddAddress(){
    const [address, setAddress] = useState('')
    return(
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '58ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div className='row'>
                    <TextField
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="outlined-required"
                        label="Btc address"
                        size="small"
                    />
                    <Button variant="contained" size="normal" onClick={() => { actions.addBtcAddress(address); setAddress('')}}>Add address</Button>
                </div>
            </Box>
        </div>
    )
}

export default AddAddress