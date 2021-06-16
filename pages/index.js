import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Greatest Banking App</title>
        <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
        <meta name="description" content="The Greatest Banking App to ever Exist" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <h1>Hello World</h1>
    </div>
  )
}
