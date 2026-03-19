import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Service from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newQuery, setNewQuery] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log("effect");
    Service.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const handleSearch = (event) => {
    console.log(event.target.value);
    setNewQuery(event.target.value);
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;

    Service.remove(id)
      .then(() => {
        setPersons((prev) => prev.filter((p) => p.id !== id));
      })
      .catch(() => {
        setNotification({
          text: `${name} was already removed from the server`,
          type: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setPersons((prev) => prev.filter((p) => p.id !== id));
      });
  };

  const query = newQuery.trim().toLowerCase();

  const personsToShow =
    query === ""
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().includes(query) ||
            person.number.includes(query),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newQuery} onChange={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        notification={notification}
        setNotification={setNotification}
      />
      <h2>Numbers</h2>
      <Persons list={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
