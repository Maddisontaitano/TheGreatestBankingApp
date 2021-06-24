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
