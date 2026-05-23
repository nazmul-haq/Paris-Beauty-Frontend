
import Layout from "@/components/Layout/layout";
import "@/styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from "../context/contextStatus";

export default function App({ Component, pageProps }) {
  return (
    <StatusProvider>
      <main> 
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover
            draggable={true}
            newestOnTop={false}
            rtl={false}
            theme="light"
          />
        </Layout>
      </main>
    </StatusProvider>
  );
}
