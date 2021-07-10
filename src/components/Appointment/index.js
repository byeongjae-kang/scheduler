import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(response => transition(SHOW))
  }

  function onConfirm() {
    transition(DELETE)
    props.cancelInterview(props.id)
      .then(response => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }
      {mode === SHOW && (
        <Show
          
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status 
          message={mode}
        />
      )}
      {mode === DELETE && (
        <Status 
          message={mode}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Delete the appointment?"
          onConfirm={onConfirm}
          onCancel={() => {back()}}
        />
      )}
    </article>
  );
}