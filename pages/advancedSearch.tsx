import React from 'react';
import {GetServerSideProps} from 'next';
import {Movie} from '../types/MovieTypes';
import {Filters} from '../components/Filters';
import {CardList} from '../components/CardList';
import {PaginationTemplate} from '../components/PaginationTemplate';
import {getExpandedMovies} from '../api';
import {CustomHead} from '../components/CustomHead';

interface Props {
  searchMovies: Movie[];
  totalResults: number;
}

export default function AdvancedSearch({
  searchMovies = [],
  totalResults,
}: Props) {
  return (
    <div
      className="flex flex-col container-xl min-h-screen gap-10 "
      style={{minHeight: 'calc(100vh - 60px)'}}>
      <CustomHead title="Advanced Search" />
      <Filters />
      {searchMovies.length > 0 ? (
        <div className="flex flex-col gap-10">
          <CardList list={searchMovies} />
          <PaginationTemplate total={totalResults} />
        </div>
      ) : (
        <h1 className="text-center text-gray-300">
          No results found, try again :(
        </h1>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query, req}) => {
  let {page} = query;

  try {
    let pageNumber = 1;

    if (page !== undefined) {
      pageNumber = Array.isArray(page) ? +page[0] : +page;
    }
    const firstAmp = req.url.indexOf('&');
    const url = req.url.substring(firstAmp);

    const searchMovies = await getExpandedMovies(pageNumber, url);

    if (!searchMovies || !searchMovies.results) {
      throw new Error('Search movies data not available');
    }

    return {
      props: {
        searchMovies: searchMovies.results,
        totalResults: searchMovies.total_results,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        searchMovies: [],
        totalResults: 0,
      },
    };
  }
};
