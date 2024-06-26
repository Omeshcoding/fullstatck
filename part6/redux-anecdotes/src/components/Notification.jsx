import { useSelector } from 'react-redux';
const Notification = () => {
  let notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return <div style={notification && style}>{notification}</div>;
};

export default Notification;
