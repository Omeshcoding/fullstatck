import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import NotificationContext from '../NotificationContext';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, notificationDispatch] = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes'],
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    notificationDispatch({ type: 'CREATE_ANECDOTE', payload: content });
    if (content.length > 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    } else {
      newAnecdoteMutation.mutate(
        notificationDispatch({ type: 'ANECDOTE_LENGTH' })
      );
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
