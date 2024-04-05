import React from 'react';
import {Movie} from '../../types/MovieTypes';
import {CardList} from '../../components/CardList';
import {PaginationTemplate} from '../../components/PaginationTemplate';
import {GetServerSideProps} from 'next';
import {getSearchMovies} from '../../api';
import {CustomHead} from '../../components/CustomHead';

interface Props {
  searchMovies: Movie[];
  totalResults: number;
}

export default function SearchedMovies({
  searchMovies = [],
  totalResults,
}: Props) {
  return (
    <div
      className="flex flex-col container-xl min-h-screen gap-10 "
      style={{minHeight: 'calc(100vh - 60px)'}}>
      <CustomHead title="Search by title" />
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
  let {query: searchQuery, page} = query;

  try {
    const searchString = searchQuery
      ? Array.isArray(searchQuery)
        ? searchQuery[0]
        : searchQuery
      : '';

    let pageNumber = 1;

    if (page !== undefined) {
      pageNumber = Array.isArray(page) ? +page[0] : +page;
    }

    const searchMovies = await getSearchMovies(searchString, pageNumber);

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
