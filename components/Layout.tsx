import {Header} from './Header';

export const Layout = ({children}) => {
  return (
    <main>
      <Header />
      <div className="bg-black py-5">{children}</div>
    </main>
  );
};
