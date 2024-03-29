import {GetServerSideProps} from 'next/types';
import React from 'react';
import Image from 'next/image';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import {baseImagePath, getMovieDetails} from '../../api';
import {CustomHead} from '../../components/CustomHead';
import {MovieByID} from '../../types/MovieTypes';

const Movie = ({movieDetails}: {movieDetails: MovieByID}) => {
  const {
    genres,
    video,
    tagline,
    poster_path,
    adult,
    revenue,
    runtime,
    status,
    popularity,
    vote_count,
    vote_average,
    release_date,
    backdrop_path,
    title,
    id,
    original_title,
    original_language,
    spoken_languages,
    production_countries,
    production_companies,
    budget,
    belongs_to_collection,
    imdb_id,
    homepage,
    overview,
  } = movieDetails;

  console.log(movieDetails);

  const getColorForRating = (rating: number) => {
    if (rating < 5) return '#ff8c5a';
    else if (rating < 7.5) return '#ffd934';
    else return '#add633';
  };

  const color = getColorForRating(vote_average);

  return (
    <>
      <CustomHead title={title} />

      <div className="flex justify-center items-center p-5 md:p-0">
        <div className="container rounded-lg flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col gap-5 max-w-[200px]">
            <div className="w-full  md:w-[200px] relative flex flex-row md:flex-col items-center gap-3 bg-gray-800 rounded-lg md:pb-3 h-max">
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
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-yellow-600">
                  Tagline
                </h3>
                <p className="text-gray-300">{tagline}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <h1 className="text-3xl font-bold text-yellow-600">{title}</h1>
            </div>
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-yellow-600">
                  Overview
                </h3>
                <p className="text-gray-300">{overview}</p>
              </div>
            </div>
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <h3 className="text-xl font-bold mb-4 text-yellow-600">
                Production companies
              </h3>
              <ul className="flex flex-col gap-5">
                {production_companies.map(company => (
                  <li key={company.id} className="flex gap-5 items-center">
                    <div className="relative h-[40px] w-[40px]">
                      <Image
                        src={baseImagePath('w300', company.logo_path)}
                        alt="Logo"
                        fill={true}
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                    <p className="text-gray-300">{company.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <h3 className="text-xl font-bold mb-5 text-yellow-600">
                Released
              </h3>
              <p className="text-gray-300">{release_date}</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <h2 className="text-xl font-bold mb-2 text-yellow-600">Genres</h2>
              <ul className="flex flex-wrap gap-2">
                {genres.map((genre, index) => (
                  <li key={index} className="bg-gray-700 px-2 py-1 rounded">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-gray-800 rounded-lg h-max">
              <h2 className="text-xl font-bold mb-2 text-yellow-600">
                Spoken languages
              </h2>
              <ul className="flex flex-wrap gap-2">
                {spoken_languages.map((language, index) => (
                  <li key={index} className="bg-gray-700 px-2 py-1 rounded">
                    {language.english_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id = +query.movieId;
  try {
    const movieDetails = await getMovieDetails(id);
    return {props: {movieDetails}};
  } catch (error) {
    console.error('Error fetching data:', error);
    return {props: {movieDetails: {}}};
  }
};
