import Link from 'next/link';

const Index = () => (
    <div>
        <h1>Home</h1>
        <Link href="/about">
            About
        </Link>
        <img src="/static/javascript-logo.png" alt="JavaScript" height="200px" />
    </div>
);

export default Index;