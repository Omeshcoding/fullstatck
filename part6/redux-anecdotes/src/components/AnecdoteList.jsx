/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { voteUpdate } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ content, id }) => {
  return (
    <div key={id}>
      <div>{content}</div>
    </div>
  );
};

const VoteUpdate = ({ anecdote, votes }) => {
  const dispatch = useDispatch();
  const handleVote = (anecdote) => {
    dispatch(voteUpdate(anecdote));

    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <div>
      has {votes}
      <button onClick={() => handleVote(anecdote)}>vote </button>
    </div>
  );
};
const AnecdoteList = () => {
  const anecdotesList = useSelector(({ filterList, anecdotes }) => {
    if (!filterList) {
      return anecdotes;
    } else {
      return anecdotes
        .map((item) => item)
        .filter((anecdote) => {
          return anecdote?.content
            ?.toLowerCase()
            .includes(filterList.toLowerCase());
        });
    }
  });

  const sortedAnecdote = [...anecdotesList]?.sort((a, b) => b.votes - a.votes);
  return (
    <>
      {' '}
      {sortedAnecdote?.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote id={anecdote.id} content={anecdote.content} />
          <VoteUpdate
            anecdote={anecdote}
            id={anecdote.id}
            votes={anecdote.votes}
          />
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
