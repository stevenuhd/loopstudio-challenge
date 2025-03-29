"use client";
import { useState } from "react";
import { CountrySearchBar } from "../components/CountrySearchBar";
import { CountryList } from "../components/CountryList";

export const CountrySearchProvider: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <CountrySearchBar onSearch={setSearchQuery} />
      <CountryList searchQuery={searchQuery} />
    </>
  );
};
