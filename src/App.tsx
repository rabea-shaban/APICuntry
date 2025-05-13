import axios from "axios";
import { useState } from "react";

type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
  };
  region: string;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = () => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((res) => {
        setCountry(res.data[0]);
        setError("");
      })
      .catch(() => {
        setCountry(null);
        setError("Country not found or an error occurred.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 font-sans flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 tracking-wide text-blue-400">
        Country Finder
      </h2>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="Enter country name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 text-white"
        />

        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded shadow-lg hover:scale-105 duration-200"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}

      {country && (
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-2xl transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-bold text-blue-300 mb-3 text-center">
            {country.name.official}
          </h3>
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-32 mx-auto mb-4 rounded border border-gray-600"
          />
          <p className="mb-1">
            Region: <span className="text-gray-300">{country.region}</span>
          </p>
          <p className="mb-1">
            Capital:{" "}
            <span className="text-gray-300">{country.capital?.[0]}</span>
          </p>
          <p className="mb-1">
            Population:{" "}
            <span className="text-gray-300">
              {country.population.toLocaleString()}
            </span>
          </p>
          <p className="mt-3 font-semibold text-blue-400">Currency:</p>
          {Object.entries(country.currencies).map(
            ([code, { name, symbol }]) => (
              <p key={code} className="text-gray-300">
                {name} ({symbol})
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
