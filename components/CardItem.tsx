import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {UserContext} from './Context';
import Image from 'next/image';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

interface Props {
  imgUrl: string;
  movieId: number;
  vote: number;
}

export const CardItem: React.FC<Props> = ({imgUrl, movieId, vote}) => {
  const [select, setSelect] = useState(false);
  const {favoritesIds, setFavoritesIds} = useContext(UserContext);
  const isFavorite = favoritesIds.find(id => id === movieId);

  const handleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();

    if (isFavorite) {
      const filteredFavorites = favoritesIds.filter(id => id !== movieId);
      setFavoritesIds(filteredFavorites);
    } else {
      setFavoritesIds([...favoritesIds, movieId]);
    }

    setSelect(selected => !selected);
  };

  useEffect(() => {
    if (isFavorite) {
      setSelect(true);
    }
  }, [isFavorite]);

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
            loading="lazy"
          />
        </div>

        <div className="absolute -top-3 -right-4 w-[50px] z-10 bg-black rounded-3xl">
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
        {select ? (
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
