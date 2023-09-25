import React from 'react';
import PropTypes from 'prop-types';
const SuccessNotification = ({ message, type }) => {
  SuccessNotification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  if (!type) return null;
  return <div className="message success_message">{message}</div>;
};

const ErrorNotification = ({ message, type }) => {
  ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  if (!type) return null;
  return <div className="message error_message">{message}</div>;
};

export { SuccessNotification, ErrorNotification };
