import React from "react";

interface Props {
  type: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}
const RedirectButton = ({ type, children }: Props) => {
  return <a className={`btn btn__redirect--${type}`}>{children}</a>;
};

export default RedirectButton;
