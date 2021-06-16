import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Greatest Banking App</title>
        <meta name="description" content="The Greatest Banking App to ever Exist" />
        <link rel="icon" href="/favicon.png" />
      </Head>
    </div>
  )
}
