import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../reducers/anecdoteReducer';
const Notification = () => {
  let notification = useSelector((state) => state.anecdotes.notification);
  const dispatch = useDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };
  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
  return <div style={notification && style}>{notification} </div>;
};

export default Notification;
