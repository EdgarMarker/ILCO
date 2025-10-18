"use client";

import React from "react";

interface Props {
  type: "primary" | "secondary" | "tertiary";
  scrollTo: string;
  children: React.ReactNode;
}

const ScrollButton = ({ type, scrollTo, children }: Props) => {
  const handleButton = () => {
    window.scrollTo(0, parseInt(scrollTo));
  };
  return (
    <button
      type="button"
      onClick={handleButton}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleButton();
        }
      }}
      className={`btn btn__scroll--${type}`}
    >
      {children}
    </button>
  );
};

export default ScrollButton;
