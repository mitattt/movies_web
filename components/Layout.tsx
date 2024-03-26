import {Header} from './Header';

export const Layout = ({children}) => {
  return (
    <main>
      <Header />
      <div className="bg-gradient-to-t from-gray-800 to-gray-900">
        {children}
      </div>
    </main>
  );
};
