import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';

const Layout = ({ children, title, description, backButton }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
        <div className="container">
            <nav>
                {backButton && (
                    <span className="back-button" onClick={() => Router.back()}>&#8678;</span>
                )}
                <Link href="/">
                    <a>
                        <span className="main-title">HackerNews</span>
                    </a>
                </Link>
            </nav>

            { children }
        </div>

        <style jsx>{`
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: #f6f6f6;
            }
            nav {
                background: #f60;
                padding: 1em;
            }
            nav > * {
                display: inline-block;
                color: black;
            }
            nav a {
                text-decoration: none;
            }
            nav .main-title {
                font-weight: bold;
            }
            nav .back-button {
                font-size: 0.9em;
                padding-right: 1em;
                cursor: pointer;
            }
        `}</style>
        <style global jsx>{`
            body {
                background: white;
                font-family: Verdana, Geneve, sans-serif;
            }
        `}</style>
    </div>
);

export default Layout;