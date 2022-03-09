import React from "react";
import { useState } from "react";

const LoginForm = ({ Login, error }) => {
  const [details, setDetails] = useState({ login: "", haslo: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  return (
    <form onSubmit={submitHandler}>
      <h2>Panel logowania administratora:</h2>
      <br></br>
      <div className="form-inner">
        {error !== "" ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            name="login"
            id="login"
            onChange={(e) => setDetails({ ...details, login: e.target.value })}
            value={details.login}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            name="haslo"
            id="haslo"
            onChange={(e) => setDetails({ ...details, haslo: e.target.value })}
            value={details.haslo}
          ></input>
        </div>
        <input type="submit" value="Logowanie administratora" />
      </div>
    </form>
  );
};

export default LoginForm;
