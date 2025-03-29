"use client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { SearchBarProps } from "../interfaces";

export const CountrySearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative w-full mt-4 mb-4">
      <IoSearch role="img" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        className="bg-white w-md pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder="Search Country, Capital City, Region or Subregion"
      />
    </div>
  );
};
