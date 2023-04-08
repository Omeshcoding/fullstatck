const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
const Content = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <Content {...part} key={part.exercises} />
      ))}

      <Total
        total={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </div>
  );
};
export default App;
