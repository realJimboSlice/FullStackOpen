import Service from "../services/persons";

const Persons = ({ list, onDelete }) => {
  return (
    <div>
      {list.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onClick={() => onDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

const Person = ({ name, number, onClick }) => {
  return (
    <li>
      {name} {number} <button onClick={onClick}>delete</button>
    </li>
  );
};

export default Persons;
