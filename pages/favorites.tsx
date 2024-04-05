import {GetServerSideProps} from 'next';
import {getMovieDetails} from '../api';
import {CardList} from '../components/CardList';
import {CustomHead} from '../components/CustomHead';
import {EmptyMessage} from '../components/EmptyMessage';
import {Movie} from '../types/MovieTypes';
import {parseCookies} from 'nookies';

interface FavoritesProps {
  movies: Movie[];
}

export default function Favorites({movies}: FavoritesProps) {
  if (movies.length === 0) {
    return (
      <div className="container-xl flex justify-center items-center h-[80vh]">
        <EmptyMessage />
      </div>
    );
  }
  return (
    <div className="container-xl flex justify-center items-center">
      <CustomHead title="Favorites" />
      <CardList list={movies} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    const cookies = parseCookies({req});
    const favoritesIds = JSON.parse(cookies.favoriteIds || '[]');
    const moviePromises = favoritesIds.map((id: number) => getMovieDetails(id));
    const fetchedMovies = await Promise.all(moviePromises);

    return {
      props: {
        movies: fetchedMovies,
      },
    };
  } catch (error) {
    console.error('An error occurred while fetching movies:', error);
    return {
      props: {
        movies: [],
      },
    };
  }
};
