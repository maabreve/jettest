import React from "react";
import Auth from "../../api/auth";

const Confirmation = () => {
  const handleClick = e => {
    e.preventDefault();
    Auth.confirmRegistration()
      .then(result => console.log(result))
      .catch(e => console.log(e));
  };

  return <button onClick={handleClick}>Alo voce</button>;
};

export default Confirmation;
