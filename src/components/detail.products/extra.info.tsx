'use client'
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RedeemIcon from '@mui/icons-material/Redeem';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import TtyIcon from '@mui/icons-material/Tty';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Item } from '@/utils/styles';
import { Divider } from '@mui/material';

const extraInfo = [
    { id: 1, icon: <SecurityIcon />, value: 'guarantee', sub: 'quality checked' },
    { id: 2, icon: <LocalShippingIcon />, value: 'free shipping', sub: 'free on all products' },
    { id: 3, icon: <RedeemIcon />, value: 'special gift card', sub: 'special gift card' },
    { id: 4, icon: <WifiProtectedSetupIcon />, value: 'free return', sub: 'within 7 days' },
    { id: 5, icon: <TtyIcon />, value: 'consultancy', sub: 'lifetime 24/7/356' }
]
const ExtraInfo = () => {
    return (
        <Item>
            {extraInfo.map((item) => {
                return (<Box key={item.id}>
                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                        {item.icon}
                        <Box>
                            <Typography sx={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 1, textTransform: 'capitalize' }}>{item.value}</Typography>
                            <Typography sx={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 1, textTransform: 'capitalize' }}>{item.sub}</Typography>
                        </Box>
                    </Box>

                    {item.id !== extraInfo.length ? <Divider /> : <></>}
                </Box>
                )
            })}
        </Item>
    )
}
export default ExtraInfo