import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function PublicLayout(props: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
}
