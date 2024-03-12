'use client'
import Container from "@mui/material/Container"
interface IProps {
    slug: string
}
const DetailProducts = (props: IProps) => {
    const { slug } = props;
    return (
        <Container>hi {slug}</Container>
    )
}
export default DetailProducts