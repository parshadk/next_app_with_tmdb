import HeroBanner from './components/HeroBanner';
import './globals.css';
import { API_URL } from '../app/utils/urls';
import Slider from '../app/components/Slider';

async function fetchAll() {
  const urls = [
    API_URL('movie', 'popular', 1),
    API_URL('movie', 'top_rated', 1),
    API_URL('movie', 'now_playing', 1),
    API_URL('movie', 'upcoming', 1),
    API_URL('tv', 'top_rated', 1)
  ];
  return Promise.all(
    urls.map((url) =>
      fetch(url, { cache: 'no-store' })
        .then((r) => r.json())
        .then((data) => ({ data, url }))
        .catch((error) => ({ error, url }))
    )
  );
}

export default async function Home() {
  const [
    popularData = { data: { results: [] } },
    topRatedData = { data: { results: [] } },
    upcomingData = { data: { results: [] } },
    seriesData = { data: { results: [] } },
  ] = await fetchAll();

  const random = popularData.data.results.length
    ? popularData.data.results[
        Math.floor(Math.random() * popularData.data.results.length)
      ]
    : null;

  return (
    <main className="sm:relative md:absolute top-0 z-0 w-full">
      {random && <HeroBanner movie={random} />}
      <div className="relative ml-6 sm:ml-12 mb-12 flex flex-col gap-6">
        {popularData.data.results.length > 0 && (
          <Slider movies={popularData.data.results} title="Popular movies" />
        )}
        {seriesData.data.results.length > 0 && (
          <Slider
            movies={seriesData.data.results.slice(0, 10)}
            title="Top rated series"
            isTop10={true}
          />
        )}
        {upcomingData.data.results.length > 0 && (
          <Slider movies={upcomingData.data.results} title="Upcoming movies" />
        )}

        {upcomingData.data.results.length > 0 && (
          <Slider movies={topRatedData.data.results} title="Top Rated" />
        )}
      </div>
    </main>
  );
}

