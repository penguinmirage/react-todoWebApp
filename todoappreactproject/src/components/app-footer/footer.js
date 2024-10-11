import React from 'react';
import './footer.css';
import PropTypes from 'prop-types';

function Footer({ count }) {
  // необходима константа для работы счетчика {}

  return (
    <div className="todo-count">
      <span>{count} items left</span>
    </div>
  );
}

export default Footer;

Footer.propTypes = {
  count: PropTypes.number,
};
