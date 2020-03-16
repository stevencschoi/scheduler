import React from "react";

const classNames = require("classNames");

import "components/Button.scss";

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  //   let buttonClass = "button";

  //   if (props.confirm) {
  //     buttonClass += " button--confirm";
  //   }

  //   if (props.danger) {
  //     buttonClass += " button--danger";
  //   }

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
