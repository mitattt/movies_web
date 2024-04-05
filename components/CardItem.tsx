import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {UserContext} from './Context';
import Image from 'next/image';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import {parseCookies, setCookie} from 'nookies';

interface Props {
  imgUrl: string;
  movieId: number;
  vote: number;
}

export const CardItem: React.FC<Props> = ({imgUrl, movieId, vote}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const {favoritesIds, setFavoritesIds} = useContext(UserContext);
  const cookies = parseCookies();

  useEffect(() => {
    const favoritesFromStorage = cookies.favoriteIds;
    if (favoritesFromStorage) {
      const parsedFavorites = JSON.parse(favoritesFromStorage);
      setFavoritesIds(parsedFavorites);
      setIsFavorite(parsedFavorites.includes(movieId));
    }
    setIsLoading(false);
  }, []);

  const handleFavorite = () => {
    const updatedFavoritesIds = isFavorite
      ? favoritesIds.filter(id => id !== movieId)
      : Array.from(new Set([...favoritesIds, movieId]));

    setCookie(null, 'favoriteIds', JSON.stringify(updatedFavoritesIds), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setFavoritesIds(updatedFavoritesIds);
    setIsFavorite(!isFavorite);
  };

  const getColorForRating = (rating: number) => {
    if (rating < 5) {
      return '#ff8c5a';
    } else if (rating < 7.5) {
      return '#ffd934';
    } else {
      return '#add633';
    }
  };

  const color = getColorForRating(vote);

  return (
    <div className="shadow-md flex flex-col w-[250px] h-full rounded cursor-pointer relative">
      <Link href={`/movies/${movieId}`} passHref>
        <div className="relative w-full h-[360px] aspect-w-1 aspect-h-1">
          <Image
            alt="Movie poster"
            src={imgUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={`${
              isLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>

        <div className="absolute -top-3 -right-4 w-[50px] z-10 bg-black rounded-full">
          <CircularProgressbarWithChildren
            value={vote}
            maxValue={10}
            styles={buildStyles({
              textColor: color,
              pathColor: color,
              trailColor: '#f354',
              strokeLinecap: 'round',
            })}
            strokeWidth={12}>
            <p className="text-sm font-semibold" style={{color}}>
              {vote ? vote.toFixed(1) : 'N/A'}
            </p>
          </CircularProgressbarWithChildren>
        </div>
      </Link>
      <div
        onClick={handleFavorite}
        className="absolute -top-[2px] left-0 opacity-50 transition-opacity duration-100 hover:opacity-100">
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
            style={{fill: '#FFD700'}}>
            <path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
            style={{fill: '#D3D3D3'}}>
            <path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z" />
          </svg>
        )}
      </div>
    </div>
  );
};
