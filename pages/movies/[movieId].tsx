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
  getSimilarVideos,
} from '../../api';
import {CommonMoviesResponse, MovieByID} from '../../types/MovieTypes';
import {SmallCardList} from '../../components/SmallCardList';
import {VideoList} from '../../components/VideoList';
import {VideoResponse} from '../../types/Video';

const Movie = ({
  movieDetails,
  similarMovies,
  additionalVideos,
}: {
  movieDetails: MovieByID;
  similarMovies: CommonMoviesResponse;
  additionalVideos: VideoResponse;
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
    backdrop_path,
  } = movieDetails;
  const additionalVideosSliced = additionalVideos.results.slice(0, 5);

  console.log(additionalVideos);

  const getColorForRating = (rating: number) => {
    if (rating < 5) return '#ff8c5a';
    else if (rating < 7.5) return '#ffd934';
    else return '#add633';
  };

  const color = getColorForRating(vote_average);

  return (
    <>
      <div className="flex justify-center items-center p-5 md:p-0 flex-col gap-10">
        <div className="container rounded-lg flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col gap-5 w-full md:max-w-[200px]">
            <div className="w-full  md:w-[200px] relative flex flex-row md:flex-col items-center gap-3 bg-neutral-800 rounded-lg md:pb-3 h-max">
              <div className="h-[220px] w-[130px] md:h-[300px] md:w-[200px] relative shrink-0">
                <Image
                  alt="Movie poster"
                  src={baseImagePath('w780', poster_path)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
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
            </div>
            {tagline.length > 0 && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <h3 className="text-xl font-bold mb-2 text-yellow-600">
                  Tagline
                </h3>
                <p className="text-gray-300">{tagline}</p>
              </div>
            )}
            <div className="p-6 bg-neutral-800 rounded-lg h-max">
              <h3 className="text-xl font-bold mb-2 text-yellow-600">Budget</h3>
              <p className="text-gray-300">{budget}$</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="p-6 bg-neutral-800 rounded-lg h-max">
              <h1 className="text-3xl font-bold text-yellow-600">{title}</h1>
            </div>
            {overview && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-yellow-600">
                    Overview
                  </h3>
                  <p className="text-gray-300">{overview}</p>
                </div>
              </div>
            )}
            {production_companies.length > 0 && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <h3 className="text-xl font-bold mb-4 text-yellow-600">
                  Production companies
                </h3>
                <ul className="flex flex-wrap gap-5">
                  {production_companies.map(company => {
                    const isImage = company.logo_path;
                    return (
                      <li
                        key={company.id}
                        className="flex gap-5 items-center bg-neutral-700 rounded-lg p-2">
                        {isImage && (
                          <div className="relative h-[60px] w-[60px]">
                            <Image
                              src={baseImagePath('w300', company.logo_path)}
                              alt="Logo"
                              fill={true}
                              objectFit="contain"
                              objectPosition="center"
                            />
                          </div>
                        )}
                        <p className="text-gray-300">{company.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            {release_date && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <h3 className="text-xl font-bold mb-5 text-yellow-600">
                  Released
                </h3>
                <p className="text-gray-300">{release_date}</p>
              </div>
            )}
            {genres && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <h2 className="text-xl font-bold mb-2 text-yellow-600">
                  Genres
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {genres.map((genre, index) => (
                    <li
                      key={index}
                      className="bg-neutral-700 px-2 py-1 rounded text-gray-300">
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {spoken_languages && (
              <div className="p-6 bg-neutral-800 rounded-lg h-max">
                <h2 className="text-xl font-bold mb-2 text-yellow-600">
                  Spoken languages
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {spoken_languages.map((language, index) => (
                    <li
                      key={index}
                      className="bg-neutral-700 px-2 py-1 rounded text-gray-300">
                      {language.english_name}
                    </li>
                  ))}
                </ul>
              </div>
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
    </>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id = +query.movieId;
  try {
    const [movieDetails, similarMovies, additionalVideos] = await Promise.all([
      getMovieDetails(id),
      getSimilarVideos(id),
      getAdditionalVideos(id),
    ]);
    return {
      props: {
        movieDetails,
        similarMovies,
        additionalVideos: additionalVideos,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {props: {movieDetails: {}, similarMovies: [], additionalVideos: []}};
  }
};
