import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./form.css";

const Form = (props) => {
  const { handleClose, formSubmit, handleonChange, rest } = props;

  return (
    <div className="add-container">
      <form onSubmit={formSubmit}>
        <div className="close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="please enter your name"
          name="name"
          className="form-groups"
          onChange={handleonChange}
          value={rest.name}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="please enter your email"
          name="email"
          className="form-groups"
          onChange={handleonChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile:</label>
        <input
          type="number"
          id="mobile"
          placeholder="please enter your mobile"
          name="mobile"
          className="form-groups"
          onChange={handleonChange}
          value={rest.mobile}
        />
        <button type="submit" className="submit-btn btn-submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default Form;
