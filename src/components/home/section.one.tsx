'use client'
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import LaptopIcon from '@mui/icons-material/Laptop';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PrintIcon from '@mui/icons-material/Print';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SpeakerIcon from '@mui/icons-material/Speaker';
import { useEffect, useState } from "react";
import CustomSlider from "./section.one/custom.slider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

interface IProps {
    categories: ICategories[] | []
}

const SectionOne = (props: IProps) => {
    const { categories } = props;
    const [categoriesWithIcons, setCategoriesWithIcons] = useState<ICategoriesWithIcons[] | []>([])
    const icons = [<SmartphoneIcon />, <TabletMacIcon />, <LaptopIcon />, <HeadphonesIcon />, <PersonalVideoIcon />, <PrintIcon />, <PhotoCameraIcon />, <SpeakerIcon />]
    useEffect(() => {
        if (categories.length > 0) {
            setCategoriesWithIcons(categories.map((i: ICategories, idx: number) => {
                return { ...i, icon: icons[idx] }
            }))
        }
    }, [categories])
    return (
        <Container sx={{ mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
                        <Item>
                            <Box sx={{ width: 1, maxWidth: 360, bgcolor: 'background.paper' }}>
                                <nav aria-label="main mailbox folders">
                                    <List subheader={<ListItemText sx={{ mb: 1 }} primary='Collections' primaryTypographyProps={{ fontSize: 20, fontWeight: 'medium' }} />}>
                                        <Divider />
                                        {categoriesWithIcons.length > 0 && categoriesWithIcons.map((category) => {
                                            return (
                                                <ListItem key={category._id} sx={{ pb: 0 }}>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            {category.icon}
                                                        </ListItemIcon>
                                                        <ListItemText primary={category.title} />
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </nav>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid sx={{ display: { xs: 'block', md: 'none' } }} xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Collections
                            </AccordionSummary>
                            <AccordionDetails>
                                {categoriesWithIcons.length > 0 && categoriesWithIcons.map((category) => {
                                    return (
                                        <ListItem key={category._id} disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {category.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={category.title} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={12} md={8}>
                        <Item sx={{ height: '100%' }}>
                            <CustomSlider />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
export default SectionOne