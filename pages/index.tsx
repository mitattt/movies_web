import React from 'react';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../api';
import {GetServerSideProps} from 'next';
import {CommonMoviesResponse, FreshMoviesResponse} from '../types/MovieTypes';
import {SmallCardList} from '../components/SmallCardList';
import Link from 'next/link';

interface Props {
  nowPlayingMovies: FreshMoviesResponse;
  upcomingMovies: FreshMoviesResponse;
  popularMovies: CommonMoviesResponse;
  topRatedMovies: CommonMoviesResponse;
}

export default function Index({
  nowPlayingMovies,
  upcomingMovies,
  popularMovies,
  topRatedMovies,
}: Props) {
  const mostPopularMovie = popularMovies.results[0];
  return (
    <main className="bg-black flex justify-center items-center flex-col gap-5">
      <section>
        <h1 className="text-gray-300">{mostPopularMovie.title}</h1>
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300">Top 20 popular movies</h2>
          <Link href="/popular">
            <div className="p-2 border border-white rounded-sm hover:cursor-pointer">
              <p className="text-gray-300 text-sm">See more</p>
            </div>
          </Link>
        </div>
        <SmallCardList list={popularMovies.results} />
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300">Top rated movies</h2>
          <Link href="/popular">
            <div className="p-2 border border-white rounded-sm hover:cursor-pointer">
              <p className="text-gray-300 text-sm">See more</p>
            </div>
          </Link>
        </div>
        <SmallCardList list={topRatedMovies.results} />
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300">Top 20 upcoming movies</h2>
          <Link href="/topRated">
            <div className="p-2 border border-white rounded-sm hover:cursor-pointer">
              <p className="text-gray-300 text-sm">See more</p>
            </div>
          </Link>
        </div>
        <SmallCardList list={upcomingMovies.results} />
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-gray-300">Top 20 now playing movies</h2>
          <Link href="/nowPlaying">
            <div className="p-2 border border-white rounded-sm hover:cursor-pointer">
              <p className="text-gray-300 text-sm">See more</p>
            </div>
          </Link>
        </div>
        <SmallCardList list={nowPlayingMovies.results} />
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [nowPlayingMovies, upcomingMovies, popularMovies, topRatedMovies] =
      await Promise.all([
        getNowPlayingMovies(),
        getUpcomingMovies(),
        getPopularMovies(),
        getTopRatedMovies(),
      ]);

    nowPlayingMovies.results.sort((a, b) => b.vote_average - a.vote_average);
    upcomingMovies.results.sort((a, b) => b.vote_average - a.vote_average);
    popularMovies.results.sort((a, b) => b.vote_average - a.vote_average);
    topRatedMovies.results.sort((a, b) => b.vote_average - a.vote_average);

    return {
      props: {
        nowPlayingMovies,
        upcomingMovies,
        popularMovies,
        topRatedMovies,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        nowPlayingMovies: [],
        upcomingMovies: [],
        popularMovies: [],
        topRatedMovies: [],
      },
    };
  }
};
