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
        .then((response) => response.json())
        .then((data) => ({ data, url }))
        .catch((error) => {
          console.error(`Error fetching data from ${url}:`, error);
          return { error, url, data: { results: [] } }; 
        })
    )
  );
}

export default async function Home() {
  const [
    popularData = { data: { results: [] } },
    topRatedData = { data: { results: [] } },
    nowPlayingData = { data: { results: [] } },
    upcomingData = { data: { results: [] } },
    seriesData = { data: { results: [] } },
  ] = await fetchAll();

 
  const popularMovies = popularData.data?.results ?? [];
  const topRatedMovies = topRatedData.data?.results ?? [];
  const nowPlayingMovies = nowPlayingData.data?.results ?? [];
  const upcomingMovies = upcomingData.data?.results ?? [];
  const topRatedSeries = seriesData.data?.results ?? [];

  const random = popularMovies.length
    ? popularMovies[
        Math.floor(Math.random() * popularMovies.length)
      ]
    : null;

  return (
    <main className="sm:relative md:absolute top-0 z-0 w-full">
      {random && <HeroBanner movie={random} />}
      <div className="relative ml-6 sm:ml-12 mb-12 flex flex-col gap-6">
        {popularMovies.length > 0 && (
          <Slider movies={popularMovies} title="Popular movies" />
        )}
        {topRatedSeries.length > 0 && (
          <Slider
            movies={topRatedSeries.slice(0, 10)}
            title="Top rated series"
            isTop10={true}
          />
        )}
        {upcomingMovies.length > 0 && (
          <Slider movies={upcomingMovies} title="Upcoming movies" />
        )}
        {topRatedMovies.length > 0 && (
          <Slider movies={topRatedMovies} title="Top rated movies" />
        )}
      </div>
    </main>
  );
}

