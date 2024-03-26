import {Movie} from '../types/MovieTypes';
import React from 'react';
import {baseImagePath} from '../api';
import {SmallCard} from './SmallCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  list: Movie[];
};

export const SmallCardList: React.FC<Props> = ({list}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 1300},
      items: 10,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: {max: 1300, min: 1024},
      items: 6,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: {max: 1024, min: 600},
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: {max: 600, min: 0},
      items: 2,
      slidesToSlide: 1,
    },
  };
  return (
    <Carousel responsive={responsive} containerClass="w-full" itemClass="p-1">
      {list.map(({title, id, vote_average, poster_path}) =>
        poster_path !== null ? (
          <div key={id} className="flex justify-center">
            <SmallCard
              title={title}
              imgUrl={baseImagePath('original', poster_path)}
              movieId={id}
              vote={vote_average}
            />
          </div>
        ) : null,
      )}
    </Carousel>
  );
};
