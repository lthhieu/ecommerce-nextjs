'use client'
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomSlider from "../home/section.two/custom.slider";
interface IProps {
    productsByCategory: null | IProducts[]
}
const PeopleAlsoBuy = (props: IProps) => {
    const { productsByCategory } = props;
    return (
        <Box>
            <Typography sx={{ py: 1, fontWeight: 500, fontSize: '18px', letterSpacing: '.1rem', }}>People also buy</Typography>
            <Divider color="#7F00FF" sx={{ height: 2 }} />
            <Box sx={{ flexGrow: 1, mt: 0 }}>
                <CustomSlider data={productsByCategory ?? []} />
            </Box>
        </Box>
    )
}
export default PeopleAlsoBuy