import Layout from '../components/Layout';

const Error = ({ statusCode }) => (
    <Layout title="Error!!!">
        {statusCode ? `Could not load your user data: Status Code ${statusCode}` : (
            <p>Couldn't get that page, sorry!</p>
        )}
    </Layout>
);

export default Error;