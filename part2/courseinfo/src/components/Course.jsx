import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <>
      {course.map((item, index) => {
        return (
          <div key={index}>
            <Header name={item.name} />
            {item.parts.map((part) => (
              <div key={part.id}>
                <Content {...part} />
              </div>
            ))}
            <Total
              total={item.parts.reduce(
                (acc, curr) => (acc += curr.exercises),
                0
              )}
              key={index}
            />
          </div>
        );
      })}
    </>
  );
};

export default Course;
