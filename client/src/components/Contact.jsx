import React, { memo, useCallback, useState } from "react";
import "./component.style.css";
import { UserData } from "../context/User.Context";

function Contact() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const { user } = UserData();

  const [seating, setSeating] = useState("");

  const handleSubmitForm= useCallback((e)=>{
    e.preventDefault();
    console.log(name, surname, seating)

  })

  return (
    <form id="contact" onSubmit={handleSubmitForm}>
      <h4>Book now</h4>
      <div className="container-1">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="container-1">
        <input placeholder={user?.email} value={user?.email} disabled />

        <input
          placeholder="seating"
          value={seating}
          onChange={(e) => setSeating(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default memo(Contact);
