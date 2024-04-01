import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <section className="bg-transparent text-white py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Welcome to <span className="text-yellow-600">HOC</span>
        </h2>
        <p className="text-lg mb-4">
          HOC is your go-to source for discovering new movies, checking out
          popular and top-rated titles, and staying up-to-date on what`s
          currently playing and what`s coming soon. With our curated collections
          and user-friendly interface, finding your next favorite movie has
          never been easier.
        </p>
        <p className="text-lg">
          Explore our website to browse through a vast collection of movies,
          watch trailers, read reviews, and much more. Get started today and
          embark on your cinematic journey with MyMovie!
        </p>
      </div>
    </section>
  );
};
