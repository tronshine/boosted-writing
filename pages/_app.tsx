import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';


const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>BOOSTED WRITING</title>
      <meta name='Boosted riting' content='Writing productivity boosting tool with paid time limits' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <div className='background'>
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
