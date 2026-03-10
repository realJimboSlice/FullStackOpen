const Countries = ({ countries, onClick }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => onClick(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
