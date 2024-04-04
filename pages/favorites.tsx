import {GetServerSideProps} from 'next';
import {getMovieDetails} from '../api';
import {CardList} from '../components/CardList';
import {CustomHead} from '../components/CustomHead';

export default function Favorites({movies}) {
  return (
    <div className="container-xl">
      <CustomHead title="Favorites" />
      <CardList list={movies} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const favoritesIds = req.cookies.Favorite
    ? JSON.parse(req.cookies.Favorite)
    : [];

  try {
    const moviePromises = favoritesIds.map((id: number) => getMovieDetails(id));
    const movies = await Promise.all(moviePromises);

    return {
      props: {
        movies,
      },
    };
  } catch (error) {
    console.error('An error occurred while fetching movies:', error);
  }
};
