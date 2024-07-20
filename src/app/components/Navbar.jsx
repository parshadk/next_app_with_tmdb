'use client';
import Link from 'next/link';
import '../globals.css';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { name: 'Home', href: '/' },
    {
      name: 'TV Series',
      href: '/series'
    },
    {
      name: 'Movies',
      href: '/movies'
    }
  ];
  return (
    <nav className="flex flex-row gap-5 items-center my-12 mr-0 ml-6 sm:ml-12 relative z-10">
      <div className="flex flex-row gap-2 items-center">
      </div>
      <div className="flex gap-4">
        {links.map((link) => (
          <Link
            className={`flex flex-col items-center justify-center gap-2 ${
              pathname === link.href && 'font-bold text-blue-400'
            }`}
            key={link.name}
            href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
