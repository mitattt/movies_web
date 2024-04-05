import Link from 'next/link';
import {Magnetic} from './Magnetic/Magnetic';

export const Footer = () => {
  return (
    <footer className="h-[20vh] text-white p-8 flex w-full ">
      <div className="w-full xl:w-[80vw] mx-auto flex flex-col md:flex-row justify-between py-[50px] gap-5">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm whitespace-nowrap">
            © {new Date().getFullYear()} MOH
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Magnetic>
            <Link
              href="/"
              className="hover:text-yellow-600 transition-colors duration-300">
              Home
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/advancedSearch"
              className="hover:text-yellow-600 transition-colors duration-300">
              Advanced Search
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/popular"
              className="hover:text-yellow-600 transition-colors duration-300">
              Popular Movies
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/topRated"
              className="hover:text-yellow-600 transition-colors duration-300">
              Top Rated Movies
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/upcoming"
              className="hover:text-yellow-600 transition-colors duration-300">
              Upcoming Movies
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/nowPlaying"
              className="hover:text-yellow-600 transition-colors duration-300">
              Now Playing Movies
            </Link>
          </Magnetic>
        </nav>
      </div>
    </footer>
  );
};
