import {GetServerSideProps} from 'next/types';
import React from 'react';
import Image from 'next/image';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import {
  baseImagePath,
  getAdditionalVideos,
  getMovieDetails,
  getMovieProviders,
  getMovieReviews,
  getSimilarVideos,
} from '../../api';
import {motion} from 'framer-motion';

import {CommonMoviesResponse, MovieByID} from '../../types/MovieTypes';
import {SmallCardList} from '../../components/SmallCardList';
import {VideoList} from '../../components/VideoList';
import {VideoResponse} from '../../types/Video';
import {Review} from '../../types/Reviews';
import {ProviderInfo} from '../../types/WatchProviders';
import Link from 'next/link';

const Movie = ({
  movieDetails,
  similarMovies,
  additionalVideos,
  reviews,
  providers,
}: {
  movieDetails: MovieByID;
  similarMovies: CommonMoviesResponse;
  additionalVideos: VideoResponse;
  reviews: Review[];
  providers: ProviderInfo[];
}) => {
  const {
    genres,
    tagline,
    poster_path,
    vote_average,
    release_date,
    title,
    spoken_languages,
    production_companies,
    budget,
    overview,
  } = movieDetails;
  const additionalVideosSliced = additionalVideos.results.slice(0, 3);
  const getColorForRating = (rating: number) => {
    if (rating < 5) return '#ff8c5a';
    else if (rating < 7.5) return '#ffd934';
    else return '#add633';
  };

  const color = getColorForRating(vote_average);

  return (
    <div className="flex justify-center items-center p-5 md:p-0 flex-col gap-10">
      <div className="container rounded-sm flex gap-5 flex-col md:flex-row w-full">
        <div className="flex flex-col gap-5 w-full md:max-w-[200px]">
          <motion.div className="w-full  md:w-[200px] relative flex flex-row md:flex-col items-center gap-3 bg-neutral-800 rounded-sm md:pb-3 h-max">
            <div className="h-[250px] w-[150px] md:h-[300px] md:w-[200px] relative shrink-0">
              <Image
                alt="Movie poster"
                src={baseImagePath('w780', poster_path)}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                loading="lazy"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <div className="w-24 h-24">
                <CircularProgressbarWithChildren
                  value={vote_average * 10}
                  maxValue={100}
                  styles={buildStyles({
                    textColor: color,
                    pathColor: color,
                    trailColor: '#4a5568',
                    strokeLinecap: 'round',
                  })}
                  strokeWidth={8}>
                  <p className="text-lg font-bold" style={{color}}>
                    {vote_average.toFixed(1)}
                  </p>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </motion.div>
          {tagline.length > 0 && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h3 className="text-xl font-bold mb-2 text-yellow-600">
                Tagline
              </h3>
              <p className="text-gray-300">{tagline}</p>
            </motion.div>
          )}
          <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
            <h3 className="text-xl font-bold mb-2 text-yellow-600">Budget</h3>
            <p className="text-gray-300">{budget}$</p>
          </motion.div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
            <h1 className="text-3xl font-bold text-yellow-600">{title}</h1>
          </motion.div>
          {overview && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-yellow-600">
                  Overview
                </h3>
                <p className="text-gray-300">{overview}</p>
              </div>
            </motion.div>
          )}
          {production_companies.length > 0 && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h3 className="text-xl font-bold mb-4 text-yellow-600">
                Production companies
              </h3>
              <ul className="flex flex-wrap gap-5">
                {production_companies.map(company => {
                  const isImage = company.logo_path;
                  return (
                    <li
                      key={company.id}
                      className="flex gap-5 items-center bg-neutral-700 rounded-sm p-2">
                      {isImage && (
                        <div className="relative h-[60px] w-[60px]">
                          <Image
                            src={baseImagePath('w300', company.logo_path)}
                            alt="Logo"
                            fill={true}
                            objectFit="contain"
                            objectPosition="center"
                            unoptimized
                          />
                        </div>
                      )}
                      <p className="text-gray-300">{company.name}</p>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
          {reviews.length > 0 && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h3 className="text-xl font-bold mb-4 text-yellow-600">
                Reviews
              </h3>
              <ul className="flex flex-wrap gap-5">
                {reviews.map(review => {
                  const isImage = review.author_details.avatar_path;
                  return (
                    <li
                      key={review.id}
                      className="flex md:flex-row flex-col items-center justify-center gap-4 bg-neutral-700 rounded-sm p-4 w-full ">
                      {isImage && (
                        <div className="relative h-[100px] w-[100px] flex-shrink-0 ">
                          <Image
                            src={baseImagePath(
                              'h632',
                              review.author_details.avatar_path,
                            )}
                            alt="Logo"
                            fill={true}
                            objectFit="contain"
                            objectPosition="center"
                            className="rounded-full"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex flex-col w-full h-full overflow-hidden">
                        <p className="text-gray-300 text-xl">{review.author}</p>
                        <p className="text-gray-300 ">{review.content}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
        <div className="flex flex-col gap-5">
          {release_date && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h3 className="text-xl font-bold mb-5 text-yellow-600">
                Released
              </h3>
              <p className="text-gray-300">{release_date}</p>
            </motion.div>
          )}
          {genres && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h2 className="text-xl font-bold mb-2 text-yellow-600">Genres</h2>
              <ul className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <li
                    key={index}
                    className="bg-neutral-700 px-2 py-1 rounded-sm text-gray-300">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {spoken_languages && (
            <motion.div className="p-6 bg-neutral-800 rounded-sm h-max hover:-translate-y-2 transition duration-300 transform">
              <h2 className="text-xl font-bold mb-2 text-yellow-600">
                Spoken languages
              </h2>
              <ul className="flex flex-wrap gap-2">
                {spoken_languages.map((language, index) => (
                  <li
                    key={index}
                    className="bg-neutral-700 px-2 py-1 rounded-sm text-gray-300">
                    {language.english_name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          {Object.entries(providers)
            .filter(([key]) => key === 'UA' || key === 'EG')
            .map(
              ([country, countryProviders], index) =>
                countryProviders.rent &&
                countryProviders.rent.length > 0 && (
                  <Link
                    target="_blank"
                    href={countryProviders.link}
                    key={countryProviders.link}
                    className="cursor-pointer">
                    <div className="p-6 bg-neutral-800 rounded-sm hover:-translate-y-2 transition duration-300 transform">
                      <p className="text-yellow-600 text-lg mb-2">
                        {country} providers
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="w-full">
                          <p className="text-gray-400 mb-2">
                            Providers available for rent:
                          </p>
                          <ul className="flex flex-wrap gap-4">
                            {countryProviders.rent.map(rentalProvider => (
                              <li
                                key={rentalProvider.provider_id}
                                className="flex items-center bg-neutral-700 rounded-sm p-2">
                                <div className="relative w-[25px] h-[25px]">
                                  <Image
                                    src={baseImagePath(
                                      'original',
                                      rentalProvider.logo_path,
                                    )}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                    className="rounded-lg"
                                    alt="Logo"
                                    unoptimized
                                  />
                                </div>
                                <p className="text-sm whitespace-nowrap text-gray-300 ml-2">
                                  {rentalProvider.provider_name}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Link>
                ),
            )}
        </div>
      </div>
      <div className="container">
        <h2 className="text-3xl font-bold text-yellow-600 mb-2">
          Similar movies
        </h2>
        <SmallCardList list={similarMovies.results} />
        <VideoList list={additionalVideosSliced} />
      </div>
    </div>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  if (!query || typeof query.movieId !== 'string') {
    return {
      props: {
        movieDetails: {},
        similarMovies: [],
        additionalVideos: [],
        reviews: [],
        providers: [],
      },
    };
  }

  const id = +query.movieId;

  try {
    const [movieDetails, similarMovies, additionalVideos, reviews, providers] =
      await Promise.all([
        getMovieDetails(id),
        getSimilarVideos(id),
        getAdditionalVideos(id),
        getMovieReviews(id),
        getMovieProviders(id),
      ]);
    return {
      props: {
        movieDetails,
        similarMovies,
        additionalVideos: additionalVideos,
        reviews: reviews.results.slice(0, 2),
        providers: providers.results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movieDetails: {},
        similarMovies: [],
        additionalVideos: [],
        reviews: [],
        providers: [],
      },
    };
  }
};
