import { useState, useEffect } from "react";

const fetchWeather = async (countries: string[]): Promise<{ [key: string]: string }> => {
  const weatherData: { [key: string]: string } = {};

  await Promise.all(
    countries.map(async (country) => {
      if (!country || country === "N/A") {
        weatherData[country] = "No data";
        return;
      }

      try {
        const response = await fetch(`https://wttr.in/${country}?format=%C+%t&lang=en`);
        if (!response.ok) throw new Error("Failed to fetch weather");
        weatherData[country] = await response.text();
      } catch (error) {
        console.error(`Error fetching weather for ${country}:`, error);
        weatherData[country] = "Error fetching";
      }
    })
  );

  return weatherData;
};

export const useWeather = (countries: string[]) => {
  const [weather, setWeather] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWeather(countries).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }, [JSON.stringify(countries)]);

  return { weather, loading };
};
