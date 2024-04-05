import {Movie} from '../types/MovieTypes';
import {CardItem} from './CardItem';
import React from 'react';
import {baseImagePath} from '../api';

type Props = {
  list: Movie[];
};

export const CardList: React.FC<Props> = ({list}) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 justify-center">
        {list.map(
          ({id, vote_average, poster_path, overview}) =>
            poster_path && (
              <div key={id}>
                <CardItem
                  imgUrl={baseImagePath('w780', poster_path)}
                  movieId={id}
                  vote={vote_average}
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
};
