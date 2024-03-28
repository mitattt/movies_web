import {useRouter} from 'next/router';
import {getNumbers} from '../utils';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import React, {useEffect} from 'react';

type Props = {
  total: number;
};

export const PaginationTemplate: React.FC<Props> = ({total}) => {
  const router = useRouter();
  let currentPage = +router.query.page;
  const perPage = 20;
  const pageCount = Math.ceil(total / perPage);
  const maxPageLinks = 5;
  const pageOffset = Math.floor(maxPageLinks / 2);
  const pageStart = Math.max(1, currentPage - pageOffset);
  const pageEnd = Math.min(pageCount, pageStart + maxPageLinks - 1);
  const pageNumbers = getNumbers(pageStart, pageEnd);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  useEffect(() => {
    if (!router.query.page) {
      router.push(`${router.route}?page=1`);
    }
  }, [router.query.page]);

  const changeToPrevPage = () => {
    const queryParam = router.query.query ? `query=${router.query.query}&` : '';
    const nextPage = currentPage - 1;
    const route = router.route.startsWith('/search')
      ? `/search/[query]`
      : router.route;
    router.push(`${route}?${queryParam}page=${nextPage}`);
  };

  const changeToNextPage = () => {
    const queryParam = router.query.query ? `query=${router.query.query}&` : '';
    const nextPage = currentPage + 1;
    const route = router.route.startsWith('/search')
      ? `/search/[query]`
      : router.route;
    router.push(`${route}?${queryParam}page=${nextPage}`);
  };

  const handle = (num: number) => {
    const queryParam = router.query.query ? `query=${router.query.query}&` : '';
    const route = router.route.startsWith('/search')
      ? `/search/[query]`
      : router.route;
    router.push(`${route}?${queryParam}page=${num}`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={changeToPrevPage}
          disabled={isFirstPage}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}>
          Previous
        </button>
        <button
          onClick={changeToNextPage}
          disabled={isLastPage}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${
            isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}>
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * perPage}</span>{' '}
            to <span className="font-medium">{currentPage * perPage}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            <div
              onClick={changeToPrevPage}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                isFirstPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}>
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {pageNumbers.map(num => (
              <div
                key={num}
                onClick={() => handle(num)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                  num === currentPage ? 'bg-gray-100' : ''
                }`}>
                {num}
              </div>
            ))}
            <div
              onClick={changeToNextPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                isLastPage
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}>
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
