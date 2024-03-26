import {AppProps} from 'next/app';
import {Layout} from '../components/Layout';
import {UserContextProvider} from '../components/Context';
import '../styles/404.css';
import '../styles/global.css';

export default function App({Component, pageProps}: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
