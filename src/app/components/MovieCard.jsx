'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '.././globals.css';
import { IMAGE_SRC } from '../utils/urls';

export default function MovieCard({ movie, index }) {
  const pathname = usePathname();
  const showTop10 = movie.name && pathname === '/';

  return (
    <Link
      key={movie.id}
      href={`/${movie.name ? 'series' : 'movies'}/${movie.id}`}
      className={`relative cursor-pointer`}>
      <div
        className={`relative flex flex-row h-full ${
          pathname === '/'
            ? 'min-w-[300px] max-w-[300px]'
            : 'w-full max-w-[500px]'
        } hover:scale-105 ease-in-out duration-300 `}>
        {showTop10 && (
          <>
            <div className="h-auto  bg-blue-600 flex items-start justify-start text-center flex-col gap-6">
              <h2 className="text-white text-5xl font-bold p-2 h-auto max-w-[80px] w-full pt-7">
                {index + 1}
              </h2>
            </div>
          </>
        )}
        <Image
          src={IMAGE_SRC('w780', movie.poster_path)}
          alt={movie.title ? movie.title : movie.name}
          width={780}
          height={400}
          className="object-cover"
          priority
        />
      </div>
    </Link>
  );
}
