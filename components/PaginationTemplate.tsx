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
  const pageCount = Math.min(Math.ceil(total / perPage), 500);

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
    const queryParams = new URLSearchParams(router.query);
    queryParams.set('page', pageNum.toString());
    const queryString = queryParams.toString();
    router.push(`${route}?${queryParam}${queryString}`);
  };

  return (
    <div className="flex items-center justify-between p-[16px] sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {!isFirstPage && (
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={isFirstPage}
            className={`relative inline-flex items-center  bg-yellow-600 p-[16px] text-sm font-medium text-black rounded-sm ${
              isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}>
            Previous
          </button>
        )}
        {!isLastPage && (
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={isLastPage}
            className={`relative inline-flex items-center bg-yellow-600 p-[16px] text-sm font-medium text-black rounded-sm ${
              isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}>
            Next
          </button>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-yellow-600">
            Showing{' '}
            <span className="font-medium">{(currentPage - 1) * perPage}</span>{' '}
            to <span className="font-medium">{currentPage * perPage}</span> of{' '}
            <span className="font-medium">{perPage * pageCount}</span> results
          </p>
        </div>
        <nav className="hidden sm:flex" aria-label="Pagination">
          {!isFirstPage && (
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={isFirstPage}
              className={`relative inline-flex items-center p-[12px] text-sm font-medium text-white focus:z-20 focus:outline-offset-0 cursor-pointer rounded-sm hover:text-black ${
                isFirstPage
                  ? 'opacity-50 cursor-not-allowed text-black'
                  : 'hover:bg-yellow-600'
              }`}>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          {pageStart > 1 && (
            <>
              <button
                onClick={() => changePage(1)}
                className={`relative inline-flex items-center p-[12px] text-sm font-medium text-white focus:z-20 focus:outline-offset-0 cursor-pointer rounded-sm hover:text-black ${
                  isFirstPage
                    ? 'opacity-50 cursor-not-allowed text-black '
                    : 'hover:bg-yellow-600 text-black '
                }`}>
                1
              </button>
              {pageStart > 2 && (
                <span className="relative inline-flex items-center p-[12px] text-sm font-medium text-white rounded-sm">
                  ...
                </span>
              )}
            </>
          )}
          {getNumbers(pageStart, pageEnd).map(num => (
            <button
              key={num}
              onClick={() => changePage(num)}
              className={`relative inline-flex items-center p-[12px] text-sm font-medium hover:text-black ${
                num === currentPage ? 'bg-yellow-600 text-black' : 'text-white'
              } hover:bg-yellow-600 focus:z-20 focus:outline-offset-0 cursor-pointer rounded-sm hover:text-black ${
                num === currentPage ? 'hover:text-black' : ''
              }`}>
              {num}
            </button>
          ))}
          {pageEnd < pageCount && (
            <>
              {pageEnd < pageCount - 1 && (
                <span className="relative inline-flex items-center p-[12px] text-sm font-medium text-white rounded-sm">
                  ...
                </span>
              )}
              <button
                onClick={() => changePage(pageCount)}
                className={`relative inline-flex items-center p-[12px] text-sm font-medium text-white focus:z-20 focus:outline-offset-0 cursor-pointer rounded-sm hover:text-black ${
                  isLastPage
                    ? 'opacity-50 cursor-not-allowed text-black'
                    : 'hover:bg-yellow-600 text-black'
                }`}>
                {pageCount}
              </button>
            </>
          )}
          {!isLastPage && (
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={isLastPage}
              className={`relative inline-flex items-center p-[12px] text-sm rounded-sm font-medium text-white focus:z-20 focus:outline-offset-0 cursor-pointer hover:text-black hover:bg-yellow-600`}>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
