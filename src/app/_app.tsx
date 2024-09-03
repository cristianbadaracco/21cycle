import Head from 'next/head'

interface MyAppProps {
  Component: any
  pageProps: any
}
const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
