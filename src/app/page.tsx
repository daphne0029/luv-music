import Link from 'next/link'
 
export default function Page() {
  return <div className="default-links">
    <Link href="/search">Search page</Link>
    <Link href="/album">Album Page</Link>
    <Link href="/artist">Artist Page</Link>
  </div>;
}
