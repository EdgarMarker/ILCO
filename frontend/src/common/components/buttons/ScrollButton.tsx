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
    <div onClick={handleButton} className={`btn btn__scroll--${type}`}>
      {children}
    </div>
  );
};

export default ScrollButton;
