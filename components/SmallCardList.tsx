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
    XLLargeDesktop: {
      breakpoint: {max: 3000, min: 1921},
      items: 10,
      slidesToSlide: 10,
      partialVisibilityGutter: 30,
    },
    extraLargeDesktop: {
      breakpoint: {max: 1920, min: 1600},
      items: 7,
      slidesToSlide: 7,
      partialVisibilityGutter: 30,
    },
    superLargeDesktop: {
      breakpoint: {max: 1600, min: 1300},
      items: 6,
      slidesToSlide: 6,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: {max: 1300, min: 1024},
      items: 5,
      slidesToSlide: 5,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {max: 1024, min: 600},
      items: 4,
      slidesToSlide: 4,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: {max: 600, min: 0},
      items: 2,
      slidesToSlide: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      containerClass="w-full"
      itemClass="p-1"
      autoPlay={true}
      infinite={true}
      autoPlaySpeed={10000}
      partialVisible={true}>
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
