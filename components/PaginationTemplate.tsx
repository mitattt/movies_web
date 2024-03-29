import {useRouter} from 'next/router';
import {getNumbers} from '../utils';
import React, {useEffect} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';

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
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  useEffect(() => {
    if (!router.query.page) {
      router.push(`${router.route}?page=1`);
    }
  }, [router.query.page]);

  const changePage = (pageNum: number) => {
    const queryParam = router.query.query ? `query=${router.query.query}&` : '';
    const route = router.route.startsWith('/search')
      ? `/search/[query]`
      : router.route;
    router.push(`${route}?${queryParam}page=${pageNum}`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={isFirstPage}
          className={`relative inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-black ${
            isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}>
          Previous
        </button>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={isLastPage}
          className={`relative inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-black ${
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
        <nav className="hidden sm:flex" aria-label="Pagination">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={isFirstPage}
            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600 focus:z-20 focus:outline-offset-0 cursor-pointer ${
              isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {pageStart > 1 && (
            <>
              <button
                onClick={() => changePage(1)}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                  isFirstPage
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}>
                1
              </button>
              {pageStart > 2 && (
                <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600">
                  ...
                </span>
              )}
            </>
          )}
          {getNumbers(pageStart, pageEnd).map(num => (
            <button
              key={num}
              onClick={() => changePage(num)}
              className={`relative inline-flex items-center px-[16px] py-3 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                num === currentPage ? 'bg-yellow-600' : ''
              }`}>
              {num}
            </button>
          ))}
          {pageEnd < pageCount && (
            <>
              {pageEnd < pageCount - 1 && (
                <span className="relative inline-flex items-center px-[16px] py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600">
                  ...
                </span>
              )}
              <button
                onClick={() => changePage(pageCount)}
                className={`relative inline-flex items-center px-[16px] py-3 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600 focus:z-20 focus:outline-offset-0 cursor-pointer ${
                  isLastPage
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}>
                {pageCount}
              </button>
            </>
          )}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={isLastPage}
            className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-yellow-600 focus:z-20 focus:outline-offset-0 cursor-pointer ${
              isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};
