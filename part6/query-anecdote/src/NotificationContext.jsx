/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return `created anecdote '${action.payload}'`;
    case 'VOTED':
      return `anecdote '${action.payload}' voted'`;
    case 'ANECDOTE_LENGTH':
      return `too short anecdote, must have length 5 or more`;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
