import { useState, useEffect } from "react";
import CountryService from "./services/countries";
import Filter from "./components/Filter";
import CountryResults from "./components/CountryResults";

function App() {
  const [countries, setCountries] = useState([]);
  const [newQuery, setNewQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    CountryService.getAll()
      .then((initialCountries) => {
        console.log("Countries successfully fetched");
        setCountries(initialCountries);
      })
      .catch((err) => {
        console.log("API call error", err);
      });
  }, []);

  const handleSearch = (e) => {
    setNewQuery(e.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const query = newQuery.toLowerCase().trim();

  const countriesToShow =
    query !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(query),
        )
      : [];

  return (
    <div>
      <h1>Country Finder</h1>
      <Filter value={newQuery} onChange={handleSearch} />
      <CountryResults
        query={query}
        selectedCountry={selectedCountry}
        countriesToShow={countriesToShow}
        onShowCountry={handleShowCountry}
      />
    </div>
  );
}

export default App;
