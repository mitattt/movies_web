import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

export const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery('');
    router.push(`/search/${searchQuery}?page=1`);
  };

  const handleOverlayClick = () => {
    setMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav className="flex items-center justify-between py-3 px-5 bg-black sticky top-0 z-[9999]">
      <div className="flex items-center">
        <Link href="/" passHref>
          <span
            className={`text-gray-300 hover:text-yellow-600 text-xl font-bold transition duration-100 ${
              isActive('/') ? 'text-yellow-600' : ''
            }`}>
            MOH
          </span>
        </Link>
      </div>
      <div className="flex items-center md:w-3/4 lg:w-2/4 relative">
        <div className="md:hidden">
          <button onClick={handleMenuClick} className="text-gray-500">
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="hidden md:flex gap-8">
          <Link href="/popular" passHref>
            <span
              className={`text-gray-300 transition duration-100 hover:text-yellow-600 ${
                isActive('/popular') ? 'text-yellow-600' : ''
              }`}>
              Popular
            </span>
          </Link>
          <Link href="/topRated" passHref>
            <span
              className={`text-gray-300 transition duration-100 hover:text-yellow-600 ${
                isActive('/topRated') ? 'text-yellow-600' : ''
              }`}>
              Top Rated
            </span>
          </Link>
          <Link href="/upcoming" passHref>
            <span
              className={`text-gray-300 transition duration-100 hover:text-yellow-600 ${
                isActive('/upcoming') ? 'text-yellow-600' : ''
              }`}>
              Upcoming
            </span>
          </Link>
          <Link href="/nowPlaying" passHref>
            <span
              className={`text-gray-300 transition duration-100 hover:text-yellow-600 ${
                isActive('/nowPlaying') ? 'text-yellow-600' : ''
              }`}>
              Now playing
            </span>
          </Link>
          <Link href="/favorites" passHref>
            <span
              className={`text-gray-300 transition duration-100 hover:text-yellow-600 ${
                isActive('/favorites') ? 'text-yellow-600' : ''
              }`}>
              Favorites
            </span>
          </Link>
        </div>

        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 flex justify-center items-start"
            onClick={handleOverlayClick}>
            <div className="absolute top-10 bg-black rounded-lg p-4">
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link href="/popular" passHref>
                  <span className="text-sm font-semibold text-gray-300">
                    Popular
                  </span>
                </Link>
                <Link href="/upcoming" passHref>
                  <span className="text-sm font-semibold text-gray-300">
                    Upcoming
                  </span>
                </Link>
                <Link href="/nowPlaying" passHref>
                  <span className="text-sm font-semibold text-gray-300">
                    Now playing
                  </span>
                </Link>
                <Link href="/favorites" passHref>
                  <span className="text-sm font-semibold text-gray-300">
                    Favorites
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex-1 ml-5">
          <input
            type="text"
            placeholder="Search!"
            className="py-2 px-4 rounded-sm w-full focus:outline-none bg-yellow-600 text-black placeholder-black"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </nav>
  );
};
