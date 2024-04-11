import { useDispatch, useSelector } from 'react-redux';
import { voteUpdate } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotesList = useSelector(({ filterList, anecdotes }) =>
    anecdotes.anecdotes.filter((item) => {
      return item?.content.toLowerCase().includes(filterList.toLowerCase());
    })
  );
  const dispatch = useDispatch();
  const vote = (id, content) => {
    dispatch(voteUpdate({ id, content }));
  };

  const sortedAnecdote = [...anecdotesList].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {' '}
      {sortedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote{' '}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
