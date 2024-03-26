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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center">
        {list.map(({title, id, vote_average, poster_path}) =>
          poster_path !== null ? (
            <div key={id}>
              <CardItem
                title={title}
                imgUrl={baseImagePath('original', poster_path)}
                movieId={id}
                vote={vote_average}
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
