import { API_URL } from '../utils/urls';
import Media from '../components/Media';

async function fetchMovies(category = 'popular') {
  'use server';
  const res = await fetch(API_URL('movie', category, 1));
  return res.json();
}

export default async function Movies() {
  return (
    <main className="relative z-10 w-full h-full flex flex-col gap-4 mb-12">
      <div className="ml-8 mr-8 flex flex-col gap-5 sm:ml-12 sm:mr-12 ">
        <Media fetchMovies={fetchMovies} />
      </div>
    </main>
  );
}
