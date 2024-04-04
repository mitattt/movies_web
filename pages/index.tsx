import React from 'react';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../api';
import {GetServerSideProps} from 'next';
import {CommonMoviesResponse, FreshMoviesResponse} from '../types/MovieTypes';
import {CarouselRow} from '../components/CarouselRow';
import {InfoSection} from '../components/InfoSection';
import {FullsizedMovieSection} from '../components/FullsizedMovieSection';
import {CustomHead} from '../components/CustomHead';

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
    <main className="bg-black flex justify-center items-center flex-col gap-5 ">
      <CustomHead title="MOH | Home" />
      <FullsizedMovieSection mostPopularMovie={mostPopularMovie} />
      <section className="w-full xl:w-[80vw] flex flex-col gap-8 px-5">
        <CarouselRow
          movies={popularMovies.results}
          title="Top 20 popular movies"
          link="/popular"
        />
        <CarouselRow
          movies={topRatedMovies.results}
          title="Top 20 rated movies"
          link="/topRated"
        />
        <InfoSection />
        <CarouselRow
          movies={upcomingMovies.results}
          title="Top 20 upcoming movies"
          link="/upcoming"
        />
        <CarouselRow
          movies={nowPlayingMovies.results}
          title="Top 20 now playing movies"
          link="/nowPlaying"
        />
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
