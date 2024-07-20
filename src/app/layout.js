import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '',
  description: 'A collection of awesome movies & TV series',
  icons: {
    icon: '/ico.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-500 text-slate-50 `}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
