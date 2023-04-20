import React from 'react';

const SuccessNotification = ({ message, type }) => {
  if (type === null) return null;
  return <div className="success message">{message}</div>;
};
const ErrorNotification = ({ message, type }) => {
  if (type === null) return null;
  return <div className="error message">{message}</div>;
};
export { SuccessNotification, ErrorNotification };
