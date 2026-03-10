const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
