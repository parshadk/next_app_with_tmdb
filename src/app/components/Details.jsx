'use client';
import Image from 'next/image';
import '../globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GoBackBtn from './GoBackBtn';
import { IMAGE_SRC } from '../utils/urls';

export default function Details({ movie }) {
  const params = usePathname();
  return (
    <>
      <Image
        src={IMAGE_SRC('w1280', movie.backdrop_path)}
        alt={params.includes('series') ? movie.name : movie.title}
        width={1280}
        height={300}
        className="h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-slate-800 opacity-70"></div>
      <div className="absolute max-w-[500px] inset-0 flex items-start justify-center flex-col gap-6 ml-6 mr-6 sm:ml-12">
        <GoBackBtn />
        <h2 className="text-white font-bold text-4xl sm:text-5xl">
          {params.includes('series') ? movie.name : movie.title}
        </h2>
        {movie.tagline && <p className="italic">{movie.tagline}</p>}
        {movie.overview && (
          <>
            <span className="line-clamp-3 overflow-hidden">
              {movie.overview}
            </span>
          </>
        )}

        {movie.homepage && (
          <Link
            href={movie.homepage}
            className="underline hover:text-red-500 m-0">
            <p>Learn more</p>
          </Link>
        )}
        <p className="bg-orange-500 p-2 rounded w-[47px] text-center">
          {Math.round(movie.vote_average * 100) / 100}
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          {movie.genres &&
            movie.genres.map((genre) => (
              <div key={genre.id} className="bg-blue-500 p-2 rounded">
                <span>{genre.name}</span>
              </div>
            ))}
        </div>

        <p>
          <span className="font-bold">
            {params.includes('series') ? 'First year date: ' : 'Release date: '}
          </span>{' '}
          {params.includes('series')
            ? movie.first_air_date
            : movie.release_date}
        </p>
      </div>
    </>
  );
}
