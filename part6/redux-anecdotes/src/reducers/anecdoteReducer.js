import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = {
  anecdotes: anecdotesAtStart.map(asObject),
  notification: null,
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = asObject(action.payload);
      state.notification = `anecdote created "${content.content}" `;
      state.anecdotes.push(content);
    },
    voteUpdate(state, action) {
      const { id } = action.payload;
      const votesToUpdate = state.anecdotes.find(
        (anecdote) => anecdote.id === id
      );
      if (votesToUpdate) {
        votesToUpdate.votes += 1;
        state.notification = `you voted "${votesToUpdate.content}"`;
      }
    },
    hideNotification(state) {
      return { ...state, notification: null };
    },
  },
});

export const { createAnecdote, voteUpdate, hideNotification } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
