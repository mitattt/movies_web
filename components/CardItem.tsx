import React, {useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {UserContext} from './Context';
import Image from 'next/image';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

interface Props {
  title: string;
  imgUrl: string;
  movieId: number;
  vote: number;
}

export const CardItem: React.FC<Props> = ({imgUrl, title, movieId, vote}) => {
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
    <div className="bg-gray-800 shadow-md flex flex-col w-[250px] h-full rounded overflow-hidden cursor-pointer relative">
      <Link href={`/movies/${movieId}`} passHref>
        <div className="block">
          <div className="w-full relative">
            <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black to-transparent"></div>
            <Image
              alt="Movie poster"
              src={imgUrl}
              width={600}
              height={600}
              className="object-cover w-full max-h-[320px]"
            />
            <div className="absolute top-2 right-2 w-[50px]">
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
                  {vote.toFixed(1)}
                </p>
              </CircularProgressbarWithChildren>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-1 px-2">
              <p className="text-sm font-semibold">{title}</p>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFavorite}
        type="button"
        className="bg-gray-400 p-2 rounded-full absolute right-4 top-16 z-1">
        {select ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-blue-500">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3 0.298782C10.7264 0.298782 10.1584 0.411797 9.62852 0.631371C9.09865 0.850924 8.61711 1.17283 8.21162 1.57847L8.00005 1.79005L7.78835 1.57836C6.96928 0.759288 5.85839 0.299139 4.70005 0.299139C3.54171 0.299139 2.43081 0.759288 1.61174 1.57836C0.792668 2.39743 0.33252 3.50833 0.33252 4.66667C0.33252 5.82501 0.792668 6.9359 1.61174 7.75497L7.50507 13.6483C7.77844 13.9217 8.22165 13.9217 8.49502 13.6483L14.3884 7.75497C14.794 7.34949 15.1158 6.86806 15.3353 6.33819C15.5549 5.80827 15.6679 5.24028 15.6679 4.66667C15.6679 4.09305 15.5549 3.52506 15.3353 2.99514C15.1158 2.46532 14.7941 1.98394 14.3885 1.57847C13.983 1.17277 13.5015 0.850945 12.9716 0.631371C12.4416 0.411797 11.8737 0.298782 11.3 0.298782Z"
              fill="#476DF4"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-blue-500">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.62852 1.63137C10.1584 1.41179 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.41179 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98393 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66666C15.6679 6.24027 15.5549 6.80826 15.3353 7.33819C15.1158 7.86806 14.794 8.34948 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.825 0.33252 5.66666C0.33252 4.50832 0.792668 3.39742 1.61174 2.57835C2.43081 1.75928 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75928 7.78835 2.57835L8.00005 2.79005L8.21162 2.57847C8.21166 2.57843 8.21158 2.57851 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07391 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07391 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.5683C6.24189 3.01178 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01178 2.60169 3.5683C2.04517 4.12482 1.73252 4.87962 1.73252 5.66666C1.73252 6.4537 2.04517 7.2085 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48952 13.8928 7.1623 14.042 6.80228C14.1911 6.44225 14.2679 6.05637 14.2679 5.66666C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17102 13.6739 3.84369 13.3983 3.56819Z"
              fill="#0F0F11"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
