import Layout from '../components/layout';
import Link from 'next/link';

const PostLinks = ({ title, slug }) => (
    <li>
        <Link as={slug} href={`/post?title=${title}`}>
            <a>{title}</a>
        </Link>
    </li>
)

const Blog = () => (
    <Layout title="My Blog">
        <ul>
            <PostLinks title="React" slug="react-post" />
            <PostLinks title="Angular" slug="angular-post" />
            <PostLinks title="Vue" slug="vue-post" />
        </ul>
    </Layout>
);

export default Blog;