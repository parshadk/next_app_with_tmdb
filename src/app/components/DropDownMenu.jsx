'use client';
import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function DropDownMenu({ doFetch }) {
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const [title, setTitle] = useState('Popular');
  const [isOpen, setIsOpen] = useState(false);

  const seriesCategory = [
    { category: 'popular', title: 'Popular' },
    {
      category: pathname === '/movies' ? 'upcoming' : 'airing_today',
      title: pathname === '/movies' ? 'Upcoming' : 'Airing today'
    },
    { category: 'top_rated', title: 'Top rated' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = async (item) => {
    setIsOpen(false);
    setTitle(item.title);
    doFetch(item.category);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:max-w-sm">
      <div className=" w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {title}
        </button>
      </div>
      {isOpen && (
        <div className="w-full origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {seriesCategory.map((item) => (
              <button
                key={item.category}
                onClick={() => handleClick(item)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {item.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
