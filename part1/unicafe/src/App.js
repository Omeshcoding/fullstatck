import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Button = ({ text, value }) => {
  return <button onClick={value}>{text} </button>;
};

const Statistics = ({ allClicks, good, bad, neutral }) => {
  const [feedback, setFeedbacks] = useState(false);

  const totalFeedbacks = good + neutral + bad;
  // Positive Feedbacks
  const positiveFeedbacks = good;
  let positivePercentage = (positiveFeedbacks / totalFeedbacks) * 100;

  //Average feedback
  var diffFeedback = good - bad;
  var averageFeedback = diffFeedback / totalFeedbacks;

  if (allClicks.length === 0) {
    return <p>No Feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={totalFeedbacks} />
        <StatisticsLine text="average" value={averageFeedback} />
        <StatisticsLine text="positive" value={`${positivePercentage} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGood = () => {
    setAll(allClicks.concat(1));
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setAll(allClicks.concat(1));
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAll(allClicks.concat(1));
    setBad(bad + 1);
  };
  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" value={handleGood} />
      <Button text="neutral" value={handleNeutral} />
      <Button text="bad" value={handleBad} />
      <h2>Statistics</h2>
      <Statistics
        allClicks={allClicks}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};
export default App;
