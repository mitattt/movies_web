import Link from 'next/link';
import {SmallCardList} from './SmallCardList';
import React from 'react';
import {Movie} from '../types/MovieTypes';

export const CarouselRow = ({
  movies,
  title,
  link,
}: {
  movies: Movie[];
  title: string;
  link: string;
}) => {
  return (
    <section className="flex flex-col w-full px-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-300">{title}</h2>
        <Link href={link}>
          <div className="p-2 border border-white rounded-sm hover:cursor-pointer">
            <p className="text-gray-300 text-sm">See more</p>
          </div>
        </Link>
      </div>
      <SmallCardList list={movies} />
    </section>
  );
};
