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
    const [balanceEth, setBalanceEth] = useState(0);
    const [balanceBtc, setBalanceBtc] = useState(0);
    const [addressEth, setAddressEth] = useState('')
    const [addressBtc, setAddressBtc] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        let sum = 0;
        walletList?.forEach(elem => {
            sum += elem.usdBalance
        });
        setTotalUsd(sum.toFixed(2));
    }, [walletList])

    useEffect(() => {
        let sumEth = 0;
        let strEth = ''
        walletList?.forEach(el => {
            if(el.net === "eth"){
                sumEth += el.usdBalance
                strEth += el.address+ '; '
            }
        });
        setBalanceEth(sumEth.toFixed(2));
        setAddressEth(strEth);
    }, [walletList])

    useEffect(() => {
        let sumBtc = 0;
        let strBtc = ''
        walletList?.forEach(el => {
            if(el.net === "btc"){
                sumBtc += el.usdBalance
                strBtc += el.address + '; '
            }
        });
        setBalanceBtc(sumBtc.toFixed(2));
        setAddressBtc(strBtc);
    }, [walletList])
    return(
    <div>
        <Header/>
        <div className="cards-total">
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
        <Card id='card-1' sx={{ minWidth: 475, width: '20%', margin: '30px'}}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                Balance ETH: ${balanceEth}
                </Typography>
                <Typography  sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                <b >Address: </b><ul><li>{addressEth}</li></ul>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate('/')}>Show wallets</Button>
            </CardActions>
        </Card>
        <Card id='card-1' sx={{ minWidth: 475, width: '20%', margin: '30px'}}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                Balance BTC: ${balanceBtc}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                <b>Address: </b><ul>
                    <li>{addressBtc}</li>
                    </ul>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate('/')}>Show wallets</Button>
            </CardActions>
        </Card>
        </div>
        
    </div>)
}

export default Profile;