import React from 'react';
import {getNowPlayingMovies, getPopularMovies, getUpcomingMovies} from '../api';
import {GetServerSideProps} from 'next';
import {CommonMoviesResponse, FreshMoviesResponse} from '../types/MovieTypes';
import {SmallCardList} from '../components/SmallCardList';

interface Props {
  nowPlayingMovies: FreshMoviesResponse;
  upcomingMovies: FreshMoviesResponse;
  popularMovies: CommonMoviesResponse;
}

export default function Index({
  nowPlayingMovies,
  upcomingMovies,
  popularMovies,
}: Props) {
  const mostPopularMovie = popularMovies.results[0];
  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-center flex-col gap-5">
      <section>
        <h1>{mostPopularMovie.title}</h1>
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-start">Top 20 popular movies</h2>
          <div className="p-2 bg-gray-700 rounded">
            <p>See more</p>
          </div>
        </div>
        <SmallCardList list={popularMovies.results} />
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-start">Top 20 upcoming movies</h2>
          <div className="p-2 bg-gray-700 rounded">
            <p>See more</p>
          </div>
        </div>
        <SmallCardList list={upcomingMovies.results} />
      </section>
      <section className="flex flex-col w-full px-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-start">Top 20 now playing movies</h2>
          <div className="p-2 bg-gray-700 rounded">
            <p>See more</p>
          </div>
        </div>
        <SmallCardList list={nowPlayingMovies.results} />
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [nowPlayingMovies, upcomingMovies, popularMovies] = await Promise.all(
      [getNowPlayingMovies(), getUpcomingMovies(), getPopularMovies()],
    );

    nowPlayingMovies.results.sort((a, b) => b.vote_average - a.vote_average);
    upcomingMovies.results.sort((a, b) => b.vote_average - a.vote_average);
    popularMovies.results.sort((a, b) => b.vote_average - a.vote_average);

    return {
      props: {
        nowPlayingMovies,
        upcomingMovies,
        popularMovies,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        nowPlayingMovies: [],
        upcomingMovies: [],
        popularMovies: [],
      },
    };
  }
};
