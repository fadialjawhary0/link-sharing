import React from 'react';

const Button = ({ loading, text }) => {
  return (
    <button disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
      {text}
    </button>
  );
};

export default Button;
