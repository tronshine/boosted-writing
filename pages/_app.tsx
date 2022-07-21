import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';


const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>BOOSTED WRITING</title>
      <meta name='Boosted riting' content='Writing productivity boosting tool with paid time limits' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'G-2KC2ME7XX5', 'auto');
        ga('send', 'pageview');
      `}
    </Script>
    <Script
      src="https://www.google-analytics.com/analytics.js"
      strategy="afterInteractive"
    />

    <Script id="hotjar-tracking" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:'3076388',hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>

    <div className='background min-h-screen'>
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
