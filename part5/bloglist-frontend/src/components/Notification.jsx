const SuccessNotification = ({ message, type }) => {
  if (!type) return null;
  return <div className="message success_message">{message}</div>;
};

const ErrorNotification = ({ message, type }) => {
  console.log(type);
  if (!type) return null;
  return <div className="message error_message">{message}</div>;
};

export { SuccessNotification, ErrorNotification };
