'use client'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Container from '@mui/material/Container';
import CustomSlider from './section.two/custom.slider';
import { ThemeProvider } from '@mui/material';
import { theme1 } from '@/utils/styles';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface IProps {
    bestSeller: IProducts[] | [],
    newArrival: IProducts[] | []
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SectionTwo(props: IProps) {
    const { bestSeller, newArrival } = props
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ mt: 1 }}>
            <Box sx={{ width: 1 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <ThemeProvider theme={theme1}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Best Seller" {...a11yProps(0)} />
                            <Tab label="New Arrival" {...a11yProps(1)} />
                        </Tabs>
                    </ThemeProvider>

                </Box>
                <CustomTabPanel value={value} index={0}>
                    <CustomSlider data={bestSeller} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <CustomSlider data={newArrival} />
                </CustomTabPanel>
            </Box>
        </Container>
    );
}