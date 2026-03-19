import Service from "../services/persons";

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  notification,
  setNotification,
}) => {
  const handleSubmitName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleSubmitNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const doesNameExist = (array, name) =>
    array.some(
      (person) =>
        person.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );

  const doesNumberExist = (array, number) =>
    array.some((person) => person.number.trim() === number.trim());

  const addPerson = (event) => {
    event.preventDefault();

    if (doesNumberExist(persons, newNumber)) {
      setNotification({
        text: `${newNumber} is already added to the phonebook!`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log(
        `User tried to add existing number "${newNumber}" to the phonebook`,
      );
      return;
    }

    /* if (doesNameExist(persons, newName)) {
      alert(`${newName} is already added to the phonebook`);
      console.log(
        `User tried to add existing name "${newName}" to the phonebook`,
      );
      return;
    } */

    if (doesNameExist(persons, newName)) {
      if (
        !window.confirm(
          `${newName} is already added to the phonebook, replace old number with new one?`,
        )
      )
        return;

      const existingPerson = persons.find(
        (p) => p.name.trim().toLowerCase() === newName.trim().toLowerCase(),
      );

      const updatedPerson = { ...existingPerson, number: newNumber };

      Service.update(existingPerson.id, updatedPerson).then(
        (returnedPerson) => {
          setPersons((prev) =>
            prev.map((p) => (p.id === existingPerson.id ? returnedPerson : p)),
          );
        },
      );
      console.log(`Succesfully updated ${updatedPerson.name}'s number!`);

      setNotification({
        text: `Succesfully updated ${updatedPerson.name}'s number!`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: Date.now(),
    };

    /* axios.post("http://localhost:3001/persons", noteObject).then((response) => {
      response.data;
    });

    setPersons((prev) => prev.concat(noteObject));
    setNewName("");
    setNewNumber(""); */

    /* axios
      .post("http://localhost:3001/persons", noteObject)
      .then((response) => {
        response.data;
      })
      .then(() => {
        setPersons((prev) => prev.concat(noteObject));
        setNewName("");
        setNewNumber("");
      }); */

    Service.create(personObject).then((returnPerson) =>
      setPersons((prev) => prev.concat(returnPerson)),
    );
    setNotification({
      text: `Succesfully added "${personObject.name}" to the phonebook!`,
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          name: <input value={newName} onChange={handleSubmitName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleSubmitNumber} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
