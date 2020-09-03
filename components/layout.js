import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = url => {
    console.log(url);
    NProgress.start();
}

Router.onRouteChangeComplete = () => {
    NProgress.done();
}

Router.onRouteChangeError = () => {
    NProgress.done();
}

const Layout = ({ title, children }) => (
    <div className="root">
        <Head>
            <title>Next.js Layout</title>
        </Head>
        <header>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/hireme">
                <a>Hire Me</a>
            </Link>
        </header>
        <h1>{title}</h1>
        {children}

        <footer>
            &copy; {(new Date()).getFullYear()}
        </footer>

        <style jsx>{`
            .root {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            header {
                display: flex;
                justify-content: space-around;
                padding: 1em 0;
                font-size: 1.2em;
                background: indigo;
                width: 100%;
            }

            header a {
                color: darkgrey;
                text-decoration: none;
            }

            header a:hover {
                font-weight: bold;
                color: lightgrey;
            }

            footer {
                padding: 1em;
            }
        `}</style>
        <style global jsx>{`
            body {
                margin: 0;
                font-size: 110%;
                background: #f0f0f0;
            }
        `}</style>
    </div>
);

export default Layout;