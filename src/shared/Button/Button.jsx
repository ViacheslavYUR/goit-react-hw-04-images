import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ loadMore, children }) => {
  return (
    <button
      type="submit"
      className={css.button}
      onClick={() => {
        loadMore();
      }}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
