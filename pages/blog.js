import Layout from '../components/Layout';
import Link from 'next/link';

const PostLinks = ({ title }) => (
    <li>
        <Link href={`/post?title=${title}`}>
            <a>{title}</a>
        </Link>
    </li>
)

const Blog = () => (
    <Layout title="My Blog">
        <ul>
            <PostLinks title="React" />
            <PostLinks title="Angular" />
            <PostLinks title="Vue" />
        </ul>
    </Layout>
);

export default Blog;