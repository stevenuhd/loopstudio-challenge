"use client";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MOCK_COUNTRIES } from "@/src/mocks/countries";
import useVoteForm from "@/src/hooks/useVoteForm";

export default function VoteFavoriteForm() {
  const {
    formState,
    errors,
    isValid,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useVoteForm();

  return (
    <div className="flex items-center justify-center my-8">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        {submitted ? (
          <div className="flex align-center">
            <IoCheckmarkCircleOutline role="icon" className="text-2xl text-green-500" />
            <p className="text-center text-gray-900 ml-2 font-semibold">
              Your vote was successfully submitted
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-700 whitespace-nowrap">
              Vote Your Favorite Country
            </h3>
            <form className="space-y-4 py-4" onSubmit={handleSubmit}>
              <div className="flex justify-items-stretch gap-4">
                <div className="w-full relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border ${
                      formState.touched.name && errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-12`}
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                  />
                  {formState.touched.name && errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="w-full relative">
                  <input
                    type="email"
                    className={`w-full px-4 py-2 border ${
                      formState.touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-12`}
                    placeholder="Email"
                    value={formState.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                  {formState.touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full relative ">
                  <select
                    className={`w-full px-4 py-2 border ${
                      formState.touched.country && errors.country
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-12`}
                    value={formState.selectedCountry}
                    onChange={(e) =>
                      handleChange("selectedCountry", e.target.value)
                    }
                    onBlur={() => handleBlur("country")}
                  >
                    <option value="">Select a Country</option>
                    {MOCK_COUNTRIES.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {formState.touched.country && errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={`relative bg-gray-950 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap ${
                      !isValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Submit Vote
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
