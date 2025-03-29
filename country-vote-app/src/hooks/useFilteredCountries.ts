import { useMemo } from "react";
import { MOCK_COUNTRIES } from "@/src/mocks/countries";
import { Country } from "@/src/app/vote-page/interfaces/index";

export const useFilteredCountries = (searchQuery: string): Country[] => {
  const searchQueryLower = searchQuery.toLowerCase();

  return useMemo(() => {
     const sortedCountries = [...MOCK_COUNTRIES].sort((a, b) => b.votes - a.votes);

    return sortedCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQueryLower) ||
        country.sub_region.toLowerCase().includes(searchQueryLower) ||
        country.capital_city.toLowerCase().includes(searchQueryLower)
    );
  }, [searchQuery]);
};