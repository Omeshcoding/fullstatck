import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateVote } from './requests';
import { useContext, useReducer } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const [, notificationDispatch] = useContext(NotificationContext);
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({ type: 'VOTED', payload: anecdote.content });
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const anecdotes = result?.data;
  if (result.isLoading) {
    return <div>loading anecdote...</div>;
  }
  if (result.isError) {
    return <div>anecdote service not available due to problem in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
