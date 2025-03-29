import Image from "next/image";
import VoteFavoriteForm from "./components/VoteFavoriteForm";
import loopStudio from "../../../public/loopStudio.svg";

import { CountrySearchProvider } from "../vote-page/providers/CountrySearchProvider";

export const metadata = {
  title: "Vote Page",
  description: " app for voting",
};

export default function VotePage() {
  return (
    <div>
      <header className="m-8">
        <Image src={loopStudio} alt="loopStudio" />
      </header>
      <section className="mx-20">
        <VoteFavoriteForm />

        <h1 className="text-3xl font-bold text-gray-800">
          Top 10 Most Voted Countries
        </h1>

        <CountrySearchProvider />
      </section>
    </div>
  );
}
