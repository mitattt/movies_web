import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import {getMovieDetails} from '../api';
import {CardList} from '../components/CardList';
import {CustomHead} from '../components/CustomHead';

export default function Favorites({movies}) {
  const router = useRouter();

  return (
    <div className="container-xl bg-white">
      <CustomHead title={'Favorites'} />
      <div className="d-flex justify-content-between align-items-center mx-3">
        <h1 className="my-3">Favorites</h1>
        <button onClick={() => router.back()} className="h-50">
          Go back
        </button>
      </div>
      <CardList list={movies} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const favoritesIds = req.cookies.Favorite
    ? JSON.parse(req.cookies.Favorite)
    : [];

  try {
    const moviePromises = favoritesIds.map(id => getMovieDetails(id));
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
