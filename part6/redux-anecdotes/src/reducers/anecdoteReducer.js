import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    votes(state, action) {
      const { id } = action.payload;
      const votesToUpdate = state.find((anecdote) => anecdote.id === id);
      if (votesToUpdate) {
        votesToUpdate.votes += 1;
      }
    },

    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdotes, votes, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdote));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdotes(newAnecdote));
  };
};
export const voteUpdate = (anecdote) => {
  return async (dispatch) => {
    const object = { ...anecdote, votes: anecdote.votes + 1 };
    const newAnecdote = await anecdoteService.updateVotes(object);
    dispatch(votes(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
