import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => (
    <Layout title="Home">
        <Link href="/profile">
            <a>Go to Profile</a>
        </Link>
    </Layout>
);

export default Index;