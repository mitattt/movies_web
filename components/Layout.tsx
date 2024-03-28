import {Header} from './Header';
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});
export const Layout = ({children}) => {
  return (
    <main className={roboto.className}>
      <Header />
      <div className="bg-black py-5">{children}</div>
    </main>
  );
};
