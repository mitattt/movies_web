import React, {useState} from 'react';
import {Movie} from '../../types/MovieTypes';
import {useRouter} from 'next/router';
import {CardList} from '../../components/CardList';
import {PaginationTemplate} from '../../components/PaginationTemplate';
import {GetServerSideProps} from 'next';
import {getSearchMovies} from '../../api';

interface Props {
  searchMovies: Movie[];
  totalResults: number;
}

export default function Film({searchMovies = [], totalResults}: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log(searchQuery.length);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery('');
    router.push(`/search/${searchQuery}?page=${currentPage}`);
  };

  return (
    <div
      className="flex flex-col container-xl bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen"
      style={{minHeight: 'calc(100vh - 60px)'}}>
      <div className="flex justify-center items-center gap-2">
        <form
          onSubmit={handleSubmit}
          className="my-5 w-full md:w-1/2 justify-start">
          <input
            type="text"
            placeholder="Search!"
            className="py-2 px-4 border border-transparent rounded-lg w-full focus:outline-none focus:border-gray-700 bg-gray-700 text-gray-100"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </form>
      </div>

      {searchMovies.length > 0 ? (
        <div className="flex flex-col gap-10">
          <CardList list={searchMovies} />
          <PaginationTemplate total={totalResults} />
        </div>
      ) : (
        <h1 className="text-center">No results found, try again :(</h1>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  let {query: searchQuery, page} = query;

  try {
    const searchString = Array.isArray(searchQuery)
      ? searchQuery[0]
      : searchQuery;
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
