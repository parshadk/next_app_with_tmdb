import Details from '@/app/components/Details';
import { API_DETAILS_URL } from '@/app/utils/urls';

async function fetchDetails(type, id) {
  const res = await fetch(API_DETAILS_URL(type, id));
  return res.json();
}

export default async function MovieDetails({ params }) {
  const { id } = params;
  const movie = await fetchDetails('movie', id);

  return (
    <main className="absolute top-0 z-0 w-full h-screen flex flex-row gap-6">
      <Details movie={movie} />
    </main>
  );
}
