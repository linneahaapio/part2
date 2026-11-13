const Countries = ({ countries, handleShowClick }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowClick(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;
