import React from 'react';
import {GetServerSideProps} from 'next';
import {getPopularMovies} from '../api';
import {Movie} from '../types/MovieTypes';
import {CardList} from '../components/CardList';
import {PaginationTemplate} from '../components/PaginationTemplate';

interface Props {
  popularMovies: Movie[];
  totalResults: number;
}

export default function Popular({popularMovies, totalResults}: Props) {
  return (
    <div
      className="flex flex-col container-xl min-h-screen"
      style={{minHeight: 'calc(100vh - 60px)'}}>
      {popularMovies.length > 0 ? (
        <div className="flex flex-col gap-10">
          <CardList list={popularMovies} />
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
    const popularMovies = await getPopularMovies(pageNumber);

    return {
      props: {
        popularMovies: popularMovies.results,
        totalResults: popularMovies.total_results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        popularMovies: [],
      },
    };
  }
};
