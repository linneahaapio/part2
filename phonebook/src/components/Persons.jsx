const Persons = ({ persons, filter, removePerson }) => {
  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
