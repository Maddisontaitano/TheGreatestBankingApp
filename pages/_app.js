<<<<<<< HEAD
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <p>test</p>
    </div>
  );
}

export default MyApp;
=======
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
>>>>>>> 65c87f0a2206fff025cd98ca2f7b7b5879366c02
