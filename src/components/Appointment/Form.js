import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // clear form functions
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  // verify that student name is not blank in form
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            //for testing purposes
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
