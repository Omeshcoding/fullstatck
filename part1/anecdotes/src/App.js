import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming witbhout an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  //
  const handleVote = () => {
    const newVotes = [...vote];
    newVotes[selected]++;
    setVote(newVotes);
  };

  // largest vote
  const largestVote = Math.max(...vote);
  const largestVoteIndex = vote.indexOf(largestVote);

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <h3>{anecdotes[selected]}</h3>
      <p>has {vote[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={nextAnecdote}> next anecdote</button>
      <p>{anecdotes[largestVoteIndex]}</p>
      <p>has {largestVote} votes</p>
    </div>
  );
};
export default App;
