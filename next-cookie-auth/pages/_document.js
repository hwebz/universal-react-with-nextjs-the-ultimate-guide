import Document, {Html, Head, Main, NextScript} from 'next/document';
import { getServerSideToken, getUserScript } from '../lib/auth';

class MyDocument extends Document {
    
    static async getInitialProps(ctx) {
        const props = await Document.getInitialProps(ctx);
        const userData = await getServerSideToken(ctx.req);

        return { ...props, userData };
    }

    render() {
        const { userData = {} } = this.props;
        return (
            <Html>
                <Head>

                </Head>
                <body>
                    <Main />

                    <script dangerouslySetInnerHTML={{ __html: getUserScript(userData) }} />

                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;