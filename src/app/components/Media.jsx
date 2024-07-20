'use client';
import { useState, useEffect, useRef } from 'react';
import List from './List';
import Loading from '../loading';
import { usePathname } from 'next/navigation';
import DropDownMenu from './DropDownMenu';

export default function Media({ fetchSeries, fetchMovies }) {
  const pathname = usePathname();
  const [searchItem, setSearchItem] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    console.log(results, 'results from search');

    const filterMedia = (item) => {
      if (pathname === '/movies') {
        return item.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }

      if (pathname === '/series') {
        return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    };

    const filteredItems = results.filter((item) => filterMedia(item));

    setFilteredItems(filteredItems);
  };

  const doFetch = async (category) => {
    const { results } =
      pathname === '/series'
        ? await fetchSeries(category)
        : await fetchMovies(category);
    if (results) {
      setResults(results);
      setFilteredItems(results);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);

      const { results } =
        pathname === '/series' ? await fetchSeries() : await fetchMovies();
      if (results) {
        setResults(results);
        setFilteredItems(results);
        setLoading(false);
      }
    }
    getData();
  }, [fetchMovies, fetchSeries, pathname]);

  return (
    <div className="relative flex flex-col gap-7 h-screen">
      {loading && <Loading />}
      <div className="flex justify-between gap-2">
        <DropDownMenu doFetch={doFetch} />
        <div className="inline-flex gap-2 items-center w-full sm:max-w-sm">
          <input
            className="px-4 py-2 w-full text-gray-700 rounded-md"
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search movies or series..."
          />
        </div>
      </div>
      <List results={filteredItems} />
    </div>
  );
}
