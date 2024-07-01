"use client"

import Dropdown from "@/app/lib/Dropdown/Dropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const router = useRouter()

  const dropdownOptions  = [
    {value: 'all', label: 'All'},
    {value: 'artist', label: 'Artist'},
    {value: 'album', label: 'Album'},
  ];

  const handleSearch = () => {
    //Go to /search?q={searchTerm}&category={searchCategory}
    const searchParams = new URLSearchParams();
    searchParams.append('q', searchTerm.trim());
    searchParams.append('category', searchCategory);
    router.push("/search?" +  searchParams.toString());
  };

  return (
    <div className="p-4 bg-gray-200 rounded-md flex gap-4">
        <div className="flex-auto">
          <input
            type="text"
            className="w-full h-full border-2 border-gray-300 rounded-md p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-self-end gap-4">
          <Dropdown
            options={dropdownOptions}
            selectedValue={searchCategory}
            onChange={setSearchCategory}
          />
          <button className="p-2 bg-indigo-500 text-white rounded-md" onClick={handleSearch}>Search</button>
        </div>
    </div>
  );
};

export default SearchBar;