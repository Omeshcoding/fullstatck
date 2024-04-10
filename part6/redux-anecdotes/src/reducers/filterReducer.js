const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTE':
      return action.payload;
    default:
      return state;
  }
};
export const filterChange = (filter) => {
  return {
    type: 'FILTER_ANECDOTE',
    payload: filter,
  };
};

export default filterReducer;
