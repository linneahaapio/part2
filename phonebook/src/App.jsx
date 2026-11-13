import { useState, useEffect } from "react";
import "./index.css";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ message: null, isError: false });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message, isError) => {
    setMessage({ message, isError });

    setTimeout(() => {
      setMessage({ message: null, isError: false });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const alreadyExists = persons.find((person) => person.name === newName);
    if (alreadyExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const replacedPerson = {
          ...alreadyExists,
          number: newNumber,
        };

        personService
          .replace(replacedPerson.id, replacedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === alreadyExists.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification(
              `Replaced number of ${returnedPerson.name}`,
              false
            );
          })
          .catch((error) => {
            showNotification(
              `Information of ${newName} has already been removed from server`,
              true
            );
            setPersons(
              persons.filter((person) => person.id !== alreadyExists.id)
            );
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      showNotification(`Added ${returnedPerson.name}`, false);
    });
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name}`, false);
        })
        .catch((error) => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            true
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} isError={message.isError} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  );
};

export default App;
