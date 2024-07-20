'use client';
import MovieCard from './MovieCard';

export default function List({ results }) {
  return (
    <div className="grid mb-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
      {results &&
        results.map((serie) => <MovieCard key={serie.id} movie={serie} />)}
    </div>
  );
}
