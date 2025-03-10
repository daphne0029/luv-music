// components/NavBar.tsx
import Link from 'next/link';
// import styles from './NavBar.module.css';

const testIds = {
  album: '3e5tDT1kfaAGx10yOjIDgW',
  aritist: 'ZRrHEecaTrG6kxlxu4TZ4g',
}

const NavBar = () => {
  const albumUrl = "/album/" + testIds.album;
  const artistUrl = "/artist/" + testIds.aritist;

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white text-lg font-bold">Home</Link>
        <Link href={albumUrl} className="text-white text-lg font-bold">Album</Link>
        <Link href={artistUrl} className="text-white text-lg font-bold">Artist</Link>
      </div>
    </nav>
  );
};

export default NavBar;
