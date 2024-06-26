import React from 'react';
import {GetServerSideProps} from 'next';
import {getNowPlayingMovies} from '../api';
import {Movie} from '../types/MovieTypes';
import {CardList} from '../components/CardList';
import {PaginationTemplate} from '../components/PaginationTemplate';
import {CustomHead} from '../components/CustomHead';

interface Props {
  nowPlayingMovies: Movie[];
  totalResults: number;
}

export default function NowPlaying({nowPlayingMovies, totalResults}: Props) {
  return (
    <div
      className="flex flex-col container-xl min-h-screen"
      style={{minHeight: 'calc(100vh - 60px)'}}>
      <CustomHead title="Now Playing" />
      {nowPlayingMovies.length > 0 ? (
        <div className="flex flex-col gap-10">
          <CardList list={nowPlayingMovies} />
          <PaginationTemplate total={totalResults} />
        </div>
      ) : (
        <h1 className="text-center">No results found, try again :(</h1>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let {page} = query;
  let pageNumber = 1;

  if (page !== undefined) {
    pageNumber = Array.isArray(page) ? +page[0] : +page;
  }
  try {
    const nowPlaying = await getNowPlayingMovies(pageNumber);

    return {
      props: {
        nowPlayingMovies: nowPlaying.results,
        totalResults: nowPlaying.total_results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        nowPlayingMovies: [],
      },
    };
  }
};
