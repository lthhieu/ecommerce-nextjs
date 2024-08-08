'use client'

import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
const Feedback = (props: IRatings) => {
    const { star, comment, postedAt, postedBy } = props;
    const name = postedBy.firstName + " " + postedBy.lastName
    const avatar = postedBy.avatar
    return (
        <>
            <Box sx={{ my: "6px", display: 'flex', gap: '10px' }}>
                {avatar !== "" ? <Avatar alt={name} src={avatar} /> : <Avatar {...stringAvatar(name)} />}
                <Box>
                    <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: '500' }}>{name}</Typography>
                        <Box component={'span'} sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ fontSize: '12px' }} />
                            <Typography sx={{ fontSize: '12px' }}>{new Date(postedAt).toLocaleString("en-GB", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}</Typography>
                        </Box>
                    </Box>
                    <Rating sx={{ my: '4px' }} size="small" value={star} readOnly />
                    <Typography sx={{ fontSize: '14px' }}>{comment}</Typography>
                </Box>
            </Box>
            <Divider sx={{ my: '14px' }} />
        </>
    )
}
export default Feedback