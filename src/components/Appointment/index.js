import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form"
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm"


export default function Appointment({id, time, interview, interviewers, bookInterview, cancelInterview}) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  // const EDIT = "EDIT";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const {mode, transition, back} = useVisualMode(interview? SHOW : EMPTY)
  const onAdd = () => {
    transition(CREATE);
  };
  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then(res =>{transition(SHOW)})
  };
  const onCancel = () => {
    back();
  }
  const onConfirm = () => {
    transition(DELETING);
    cancelInterview(id)
    .then(res =>{transition(EMPTY)})
  };
  const onDelete = () => {
    transition(CONFIRM);
  };
  // const onComplete = () => {
  //   transition(EMPTY);
  // };
  // const onEdit = () => {
  //   transition(EDIT);
  // };


  return <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={onDelete}
      />
    )} 
    {mode === CREATE && (
      <Form
        interviewers={interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />)}
    {mode === SAVING && <Status message="saving"/>}   
    {mode === CONFIRM && <Confirm 
      message="Are you sure you would like to delete?" 
      onConfirm={onConfirm} 
      onCancel={onCancel}
    />}
    {mode === DELETING && <Status message="deleting"/>}   

  </article>;
}
