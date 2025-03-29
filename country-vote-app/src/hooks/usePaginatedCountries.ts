import { useMemo } from "react";
import { Country } from "@/src/app/vote-page/interfaces/index";

export const usePaginatedCountries = (
  countries: Country[],
  currentPage: number,
  itemsPerPage: number
): Country[] => {
  return useMemo(() => {
    const displayedCountries = countries.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return displayedCountries;
  }, [countries, currentPage, itemsPerPage]);
};
