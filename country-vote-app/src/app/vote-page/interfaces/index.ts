 export type Country = {
  name: string;
  sub_region: string;
  capital_city: string;
  region: string;
  votes: number;
};

export interface CountryListProps {
  searchQuery: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface Errors {
  name: string;
  email: string;
  country: string;
}

export interface FormState {
  name: string;
  email: string;
  selectedCountry: string;
  touched: {
    name: boolean;
    email: boolean;
    country: boolean;
  };
}