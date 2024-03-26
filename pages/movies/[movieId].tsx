import {GetServerSideProps} from 'next/types';
import {useRouter} from 'next/router';
import {baseImagePath, getMovieDetails} from '../../api';
import {CustomHead} from '../../components/CustomHead';
import Image from 'next/image';
import React from 'react';
import {MovieByID} from '../../types/MovieTypes';

const genresConstants = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Function',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const Movie = ({movieDetails}: {movieDetails: MovieByID}) => {
  const router = useRouter();
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

  return (
    <div className="container-xl px-4 bg-white">
      <CustomHead title={title} />
      <div className="flex justify-between items-center">
        <h1 className="my-3 text-3xl">{title}</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="h-12 bg-blue-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Go back
        </button>
      </div>
      <div className="flex gap-5 mb-3 flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col max-w-[300px] gap-4">
          <Image
            src={baseImagePath('w1280', poster_path)}
            alt="Movie poster"
            className="object-cover"
            width={300}
            height={450}
          />

          <ul className="flex flex-wrap gap-3">
            {genres.map((genre, index) => (
              <li
                key={index}
                className="px-3 py-1 text-sm bg-blue-200 rounded-full border border-blue-300">
                {genre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4">
          <p className="text-xl">{tagline}</p>
          <p className="text-xl">{overview}</p>
          <p className="text-lg">Budget {budget}</p>
          {adult && <p className="text-lg">Adult</p>}
          <p className="text-xl">Vote average: {vote_average}</p>
          <p className="text-xl">Release data: {release_date}</p>
          <p className="text-xl">Vote count: {vote_count}</p>
          <p className="text-xl">Runtime: {runtime}</p>
          <p className="text-xl">Popularity: {popularity}</p>
          <p className="text-xl">Status: {status}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id = +query.movieId;
  try {
    const movieDetails = await getMovieDetails(id);

    return {
      props: {
        movieDetails,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movieDetails: {},
      },
    };
  }
};
