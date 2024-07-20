'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import '../globals.css';
import { IMAGE_SRC } from '../utils/urls';

export default function HeroBanner({ movie }) {
  return (
    <div className="hidden fade sm:block relative bg-gray-950 h-[1000px]">
      <Image
        src={IMAGE_SRC('w1280', movie.backdrop_path)}
        alt="/"
        width={1280}
        height={300}
        className="h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gray-950 h-full w-full object-cover opacity-50"></div>
      <div className="absolute max-w-[500px] inset-0 flex items-start justify-center flex-col gap-6 ml-12 animate-fade-right animate-once animate-ease-linear">
        <h2 className="text-white text-lg sm:text-3xl md:text-5xl font-bold">
          {movie.title}
        </h2>
        <p className="line-clamp-3 overflow-hidden">{movie.overview}</p>
        <Link href={`/${movie.name ? 'series' : 'movies'}/${movie.id}`}>
          <button className="bg-yellow-600 text-white hover:bg-yellow-300 font-bold py-2 px-4 rounded inline-flex items-center gap-3">
            <span>More Info</span>
            <FaArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
