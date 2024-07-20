import { API_URL } from '../utils/urls';
import Media from '../components/Media';

async function fetchSeries(category = 'popular') {
  'use server';
  const res = await fetch(API_URL('tv', category, 1));
  return res.json();
}

export default async function Series() {
  return (
    <main className="relative w-full h-screen flex flex-col gap-4 mb-12">
      <div className="ml-8 mr-8 mb-8 h-screen flex flex-col gap-5 sm:ml-12 sm:mr-12 ">
        <Media fetchSeries={fetchSeries} />
      </div>
    </main>
  );
}
