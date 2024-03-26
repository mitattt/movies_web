import React from 'react';
import Link from 'next/link';
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

export const SmallCard: React.FC<Props> = ({imgUrl, title, movieId, vote}) => {
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
    <div className="bg-gray-800 shadow-md flex flex-col w-[150px] h-full rounded overflow-hidden cursor-pointer relative">
      <Link href={`/movies/${movieId}`} passHref>
        <div>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
          <Image
            alt="Movie poster"
            src={imgUrl}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-1 right-1 w-[35px]">
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
      </Link>
    </div>
  );
};
