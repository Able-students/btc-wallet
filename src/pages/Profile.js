import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const { walletList } = useSelector((state) => state.walletReducer);
    const [totalUsd, setTotalUsd] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        let sum = 0;
        walletList?.forEach(elem => {
            sum += elem.usdBalance
        });
        setTotalUsd(sum.toFixed(2));
    }, [walletList])
    
    return(
    <div>
        <Header/>
        <Card id='card-1' sx={{ minWidth: 275, width: '20%', margin: '30px'}}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                Total balance: ${totalUsd}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate('/')}>Show wallets</Button>
            </CardActions>
        </Card>
    </div>)
}

export default Profile;