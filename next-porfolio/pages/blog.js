import Layout from '../components/layout';
import Link from 'next/link';

const PostLinks = ({ title, slug }) => (
    <li>
        {/* Slug will enable dynamic route rendering, which if we refresh the page then it will 404 */}
        {/* <Link as={slug} href={`/post?title=${title}`}> */}
        <Link href={`/post?title=${title}`}>
            <a>{title}</a>
        </Link>
    </li>
)

const Blog = () => (
    <Layout title="My Blog Posts">
        <ul>
            <PostLinks title="React" slug="react-post" />
            <PostLinks title="Angular" slug="angular-post" />
            <PostLinks title="Vue" slug="vue-post" />
        </ul>
    </Layout>
);

export default Blog;