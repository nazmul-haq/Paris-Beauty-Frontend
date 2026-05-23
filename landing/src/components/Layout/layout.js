import Head from "next/head";
import Script from "next/script";
import { Fragment } from "react";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>checkout - paris Beauty BD</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '689139509931849');
          fbq('track', 'PageView');
          `,
        }}
      />

      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NNCSPDMM');
      `,
        }}
      />
      <div className="font-body">
        {/* <Navbar /> */}
        <div className="flex">
          <div className="flex-1 overflow-auto">
            <Fragment>{children}</Fragment>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
