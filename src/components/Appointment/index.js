import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "./Error";

//modes used to let dom know what to render
const SHOW = "SHOW";
const EDIT = "EDIT";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  //add, remove, store, and replace modes
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  //set state and mode, and call function to send put request to server
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  //set state and mode, and call function to send delete request to server
  const onConfirm = () => {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then((response) => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CONFIRM && (
        <Confirm message="Delete the appointment?" onConfirm={onConfirm} onCancel={back} />
      )}
      {(mode === SAVING || mode === DELETE) && <Status message={mode} />}
      {(mode === ERROR_SAVE || mode === ERROR_DELETE) && (
        <Error
          message={`Could not ${mode === ERROR_SAVE ? "save" : "delete"} appointment`}
          onClose={back}
        />
      )}
    </article>
  );
}
