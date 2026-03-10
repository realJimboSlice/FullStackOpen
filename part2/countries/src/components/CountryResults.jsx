import Countries from "./Countries";
import Country from "./Country";
import Notification from "./Notification";

const CountryResults = ({
  query,
  selectedCountry,
  countriesToShow,
  onShowCountry,
}) => {
  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  }

  if (query === "") {
    return (
      <Notification
        notification={{
          type: "error",
          text: "Please type in the name of a country",
        }}
      />
    );
  }

  if (countriesToShow.length > 10) {
    return (
      <Notification
        notification={{
          type: "error",
          text: "Too many matches, specify another filter",
        }}
      />
    );
  }

  if (countriesToShow.length === 0 && query.length > 1) {
    return (
      <Notification
        notification={{
          type: "error",
          text: "No matches found, specify another filter",
        }}
      />
    );
  }

  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }

  if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
    return <Countries countries={countriesToShow} onClick={onShowCountry} />;
  }

  return null;
};

export default CountryResults;
