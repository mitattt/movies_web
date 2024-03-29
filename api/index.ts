import {
  CommonMoviesResponse,
  FreshMoviesResponse,
  MovieByID,
} from '../types/MovieTypes';
import {VideoResponse} from '../types/Video';

const API_KEY = 'bfffaf71459ee055fb33c621c9cd67bc';
const BASE_URL = 'https://api.themoviedb.org/3/';
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = {method};
  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  const response = await fetch(BASE_URL + url, options);
  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

export const getNowPlayingMovies = (page: number = 1) => {
  return client.get<FreshMoviesResponse>(
    `movie/now_playing?api_key=${API_KEY}&page=${page}`,
  );
};

export const getSimilarVideos = (movieId: number) => {
  return client.get<CommonMoviesResponse>(
    `movie/${movieId}/similar?api_key=${API_KEY}`,
  );
};

export const getAdditionalVideos = (movieId: number) => {
  return client.get<VideoResponse>(
    `movie/${movieId}/videos?api_key=${API_KEY}`,
  );
};

export const getUpcomingMovies = (page: number = 1) => {
  return client.get<FreshMoviesResponse>(
    `movie/upcoming?api_key=${API_KEY}&page=${page}`,
  );
};

export const getPopularMovies = (page: number = 1) => {
  return client.get<CommonMoviesResponse>(
    `movie/popular?api_key=${API_KEY}&page=${page}`,
  );
};

export const getTopRatedMovies = (page: number = 1) => {
  return client.get<CommonMoviesResponse>(
    `movie/top_rated?api_key=${API_KEY}&page=${page}`,
  );
};

export const getSearchMovies = (keyword: string, page: number) => {
  return client.get<CommonMoviesResponse>(
    `search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`,
  );
};

export const getMovieDetails = (id: number) => {
  return client.get<MovieByID>(`movie/${id}?api_key=${API_KEY}`);
};

export const getMovieCastDetails = (id: number) => {
  return client.get<any>(`movie/${id}/credits?api_key=${API_KEY}`);
};
