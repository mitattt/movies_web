import React, {useEffect} from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

export const InfoSection: React.FC = () => {
  const controls = useAnimation();
  const {ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: {duration: 0.6},
      });
    }
  }, [controls, inView]);

  return (
    <section className="bg-transparent text-white py-12">
      <div ref={ref}>
        <motion.div
          initial={{opacity: 0, x: -50}}
          animate={controls}
          className="container mx-auto"
          style={{willChange: 'opacity'}}>
          <h2 className="text-3xl font-semibold mb-6">
            Welcome to <span className="text-yellow-600">MOH</span>
          </h2>
          <p className="text-lg mb-4">
            MOH is your go-to source for discovering new movies, checking out
            popular and top-rated titles, and staying up-to-date on what`s
            currently playing and what`s coming soon. With our curated
            collections and user-friendly interface, finding your next favorite
            movie has never been easier.
          </p>
          <p className="text-lg">
            Explore our website to browse through a vast collection of movies,
            watch trailers, read reviews, and much more. Get started today and
            embark on your cinematic journey with MOH!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
