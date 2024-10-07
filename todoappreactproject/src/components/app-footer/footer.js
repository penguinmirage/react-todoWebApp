import React from "react";
import "./footer.css";

function Footer({ count }) {
  // необходима константа для работы счетчика {}

  return (
    <div className="todo-count">
      <span>{count} items left</span>
    </div>
  );
}

export default Footer;
