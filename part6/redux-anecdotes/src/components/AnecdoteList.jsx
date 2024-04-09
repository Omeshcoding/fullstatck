import { useDispatch, useSelector } from 'react-redux';
import { voteUpdate } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteUpdate(id));
  };
  const sortedAnecdote = anecdotes.sort((a, b) => b.votes - a.votes);
  return (
    <>
      {' '}
      {sortedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
