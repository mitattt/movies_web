import Link from 'next/link';
import {SmallCardList} from './SmallCardList';
import React from 'react';
import {Movie} from '../types/MovieTypes';
import {motion} from 'framer-motion';
import {Magnetic} from './Magnetic/Magnetic';

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
    <section className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-yellow-600 text-xl">{title}</h2>
        <Magnetic>
          <Link href={link}>
            <motion.div
              whileHover={{borderColor: '#f59e0b', transition: {duration: 0.2}}}
              className="p-2 border border-white rounded-sm hover:cursor-pointer">
              <p className="text-gray-300 text-sm">See more</p>
            </motion.div>
          </Link>
        </Magnetic>
      </div>
      <SmallCardList list={movies} />
    </section>
  );
};
