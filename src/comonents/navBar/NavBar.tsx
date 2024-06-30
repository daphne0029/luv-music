// components/NavBar.tsx
import Link from 'next/link';
import styles from './NavBar.module.css';

const testIds = {
  album: '2Jrp37x38qZqtyrIrfxN4H',
  aritist: 'ZRrHEecaTrG6kxlxu4TZ4g',
}

const NavBar = () => {
  const albumUrl = "/album/" + testIds.album;
  const artistUrl = "/artist/" + testIds.aritist;

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white text-lg font-bold">Home</Link>
        <Link href={albumUrl} className="text-white text-lg font-bold">Album</Link>
        <Link href={artistUrl} className="text-white text-lg font-bold">Artist</Link>
      </div>
    </nav>
  );
};

export default NavBar;
