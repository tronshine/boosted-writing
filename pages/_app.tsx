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

    <Script 
      src="https://www.googletagmanager.com/gtag/js?id=G-2KC2ME7XX5"
      strategy="afterInteractive"
    />
    <Script id="google-gtag" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
  
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
      `}
    </Script>

    <Script id="hotjar-tracking" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:'${process.env.NEXT_PUBLIC_HOTJAR_SITE_ID}',hjsv:6};
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
