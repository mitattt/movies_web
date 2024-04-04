import {baseImagePath} from '../api';
import {AnimatePresence, motion} from 'framer-motion';
import Image from 'next/image';
import {ProgressBar} from './ProgressBar';
import Link from 'next/link';
import React from 'react';
import {Movie} from '../types/MovieTypes';
import {Magnetic} from './Magnetic/Magnetic';

export const FullsizedMovieSection = ({
  mostPopularMovie,
}: {
  mostPopularMovie: Movie;
}) => {
  const normalizedVotes = parseInt(
    mostPopularMovie.vote_count.toString().replace(/\D/g, ''),
  );
  const normalizedPopularity = parseInt(
    mostPopularMovie.popularity.toString().replace(/\D/g, ''),
  );

  return (
    <section
      className="h-full md:h-[70vh] lg:h-[40vh] w-full relative my-8 md:my-16 flex justify-center"
      style={{
        zIndex: 0,
      }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${baseImagePath(
            'original',
            mostPopularMovie.backdrop_path,
          )})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="flex flex-col md:flex-row p-8 gap-5 items-center w-full md:w-[90vw] lg:w-[80vw] xl:w-[65vw]">
        <AnimatePresence>
          {mostPopularMovie && (
            <motion.div
              initial={{opacity: 0, x: -50}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.7}}
              exit={{opacity: 0, x: -100}}>
              <div className="relative h-[400px] w-[265px] md:flex-shrink-0">
                <Image
                  src={baseImagePath('w1280', mostPopularMovie.poster_path)}
                  alt="Movie Poster"
                  fill={true}
                  objectFit="contain"
                  objectPosition="center"
                  className="rounded-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col md:ml-8 mt-4 md:mt-0 relative">
          <p className="text-yellow-600 font-semibold text-xl mb-2">
            {mostPopularMovie.title}
          </p>
          <p className="text-gray-200 mb-4">{mostPopularMovie.overview}</p>
          <div className="flex flex-col flex-wrap mb-4 gap-3">
            <div>
              <p className="text-gray-300 mb-2 md:mb-0">
                Rating: {mostPopularMovie.vote_average.toFixed(1)} / 10
              </p>
              <ProgressBar value={mostPopularMovie.vote_average} max={10} />
            </div>
            <div>
              <p className="text-gray-300 mb-2 md:mb-0">
                Popularity: {mostPopularMovie.popularity}
              </p>
              <ProgressBar
                value={normalizedPopularity}
                max={normalizedPopularity * 2}
              />
            </div>
            <div>
              <p className="text-gray-300 mb-2 md:mb-0">
                Vote Count: {mostPopularMovie.vote_count}
              </p>
              <ProgressBar
                value={normalizedVotes}
                max={normalizedPopularity / 10}
              />
            </div>
            <p className="text-gray-300 mb-2 md:mb-0">
              Release Date: {mostPopularMovie.release_date}
            </p>
          </div>
          <Link href={`movies/${mostPopularMovie.id}`}>
            <Magnetic>
              <motion.div
                className="p-2 bg-yellow-600 rounded-sm w-max flex gap-2 items-center border border-yellow-600"
                initial={{opacity: 0, scale: 0.7}}
                animate={{opacity: 1, scale: 1}}
                whileHover={{borderColor: '#FFF', transition: {duration: 0.2}}}
                transition={{duration: 0.5, delay: 0.6}}>
                <p className="text-sm font-semibold">See more</p>
                <svg
                  fill="#000000"
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path
                        d="M500.203,236.907L30.869,2.24c-6.613-3.285-14.443-2.944-20.736,0.939C3.84,7.083,0,13.931,0,21.333v469.333
      c0,7.403,3.84,14.251,10.133,18.155c3.413,2.112,7.296,3.179,11.2,3.179c3.264,0,6.528-0.747,9.536-2.24l469.333-234.667
      C507.435,271.467,512,264.085,512,256S507.435,240.533,500.203,236.907z"
                      />
                    </g>
                  </g>
                </svg>
              </motion.div>
            </Magnetic>
          </Link>
        </div>
      </div>
    </section>
  );
};
