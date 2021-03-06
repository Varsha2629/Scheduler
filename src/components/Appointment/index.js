import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETEING = "DELETEING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer, isEdit) => {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview, isEdit)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const del = (event) => {
    transition(DELETEING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };
  
  return (
    <article className="appointment">
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
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          isEdit={false}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === EDIT && (
        <Form
          onSave={save}
          isEdit={true}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={del} onCancel={() => back()} />}
      {mode === DELETEING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={() => back()} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={() => back()} />
      )}
    </article>
  );
};

export default Appointment;
