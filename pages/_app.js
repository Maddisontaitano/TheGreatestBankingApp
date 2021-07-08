import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
      <Head>
        <title>The Greatest Banking App</title>
            <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
            </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
