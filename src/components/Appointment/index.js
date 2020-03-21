import React from "react";
import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(student, interviewer) {
    const interview = {
      student,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE));
  }

  function deleteItem() {
    transition(DELETING, true);
    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={deleteItem} />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          bookInterview={props.bookInterview}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Error Saving. Please try again."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error Deleting. Please try again."
          onClose={() => back()}
        />
      )}
    </article>
  );
}

// return (
//   <article className="appointment">
//     <Header time={props.time} />
//     {mode === EMPTY &&
//       <Empty onAdd={() => transition(CREATE)}
//       />}
//     {mode === SHOW && (
//       <Show
//         student={props.interview.student}
//         interviewer={props.interview.interviewer}
//         onDelete={() => transition(CONFIRM)}
//         onEdit={() => transition(EDIT)}
//       />
//     )}
//     {mode === CREATE && (
//       <Form
//         interviewers={props.interviewers}
//         onCancel={() => back()}
//         onSave={save}
//       />
//     )}
//     {mode === SAVING && (
//       <Saving />
//     )}
//     {mode === CONFIRM && (
//       <Confirm
//         onCancel={() => back()}
//         onConfirm={deleteItem}
//       />
//     )}
//     {mode === DELETING && (
//       <Deleting />
//     )}
//     {mode === EDIT && (
//       <Form
//         name={props.interview.student}
//         interviewer={props.interview.interviewer.id}
//         interviewers={props.interviewers}
//         onCancel={() => transition(SHOW)}
//         onSave={save}
//       />
//     )}
//     {mode === ERROR_SAVE && (
//       <ErrorSaving
//       onClose={() => back()}
//       />
//     )}
//     {mode === ERROR_DELETE && (
//       <ErrorDelete
//       onClose={() => back()}
//       />
//     )}
//   </article>
// )
