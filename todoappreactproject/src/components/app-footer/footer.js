import React from "react";
import "./footer.css";

function Footer({ count }) {
  // необходима константа для работы счетчика {}

  return (
    <div className="footer">
      <span className="todo-count">{count} items left</span>
    </div>
  );
}

export default Footer;
