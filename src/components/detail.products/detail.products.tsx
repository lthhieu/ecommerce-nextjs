'use client'
import Container from "@mui/material/Container"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/helper";

interface IProps {
    data: null | IProducts
}
const DetailProducts = (props: IProps) => {
    const { data } = props;
    return (
        <Container sx={{ mt: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link href="/" style={{ textDecoration: 'unset', color: 'unset' }}>
                    Home
                </Link>
                <Link
                    style={{ textDecoration: 'unset', color: 'unset' }}
                    href={`/collections/${data?.category.title.toLowerCase()}`}
                >
                    {capitalizeFirstLetter(data?.category.title || 'category')}
                </Link>
                <Typography color="text.primary">{data?.title || 'Product'}</Typography>
            </Breadcrumbs>
            {/* <RouterBreadcrumbs /> */}
        </Container>
    )
}
export default DetailProducts