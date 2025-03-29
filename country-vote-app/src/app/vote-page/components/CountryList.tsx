"use client";
import { useState } from "react";
import { CountryListProps } from "../interfaces";
import { useWeather } from "@/src/hooks/useWeather";
import { useFilteredCountries } from "@/src/hooks/useFilteredCountries";
import { usePaginatedCountries } from "@/src/hooks/usePaginatedCountries";

export const CountryList: React.FC<CountryListProps> = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;
  const filteredCountries = useFilteredCountries(searchQuery);
  const displayedCountries = usePaginatedCountries(
    filteredCountries,
    currentPage,
    itemsPerPage
  );
  const totalPages: number = Math.ceil(filteredCountries.length / itemsPerPage);
  const { weather, loading } = useWeather(
    displayedCountries.map((country) => country.name)
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 my-12">
      {displayedCountries.length === 0 ? (
        <p className="text-center text-gray-500">No countries found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="p-2 text-start font-bold">Country</th>
                <th className="p-2 text-start font-bold">Capital City</th>
                <th className="p-2 text-start font-bold">Region</th>
                <th className="p-2 text-start font-bold">Sub Region</th>
                <th className="p-2 text-start font-bold">Weather</th>
                <th className="p-2 text-start font-bold">Votes</th>
              </tr>
            </thead>
            <tbody>
              {displayedCountries.map(
                ({ name, sub_region, capital_city, region, votes }) => (
                  <tr key={name} className="text-start">
                    <td className="p-2 font-[500]">{name}</td>
                    <td className="p-2 font-[500]">{capital_city}</td>
                    <td className="p-2 font-[500]">{region}</td>
                    <td className="p-2 font-[500]">{sub_region}</td>

                    <td className="p-2 font-[500]">
                      {loading ? "Loading..." : weather[name] || "No data"}
                    </td>
                    <td className="p-2 font-[500]">{votes}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {totalPages > 1 && displayedCountries.length > 0 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-gray-800 text-white rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-800 text-white rounded-md disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
