'use client'
 
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    return <div>Searching query is {q} and category is {category}.</div>
}
