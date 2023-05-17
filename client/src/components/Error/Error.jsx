import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const error = useSelector((state) => state.error);

  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
