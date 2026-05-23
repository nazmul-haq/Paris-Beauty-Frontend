import Head from "next/head";
import { Fragment } from "react";
import Footer from "./Footer";


const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>checkout - Laxzin</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-57KHNTJQ');
        `,
          }}
        />
      </Head>
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
