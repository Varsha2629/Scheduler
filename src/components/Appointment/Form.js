import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
//  console.log(props)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset=()=> {
    setStudent("")
    setInterviewer(null)
  }

  const cancel=()=> {
    reset()
    props.onCancel()
  }
  
return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off" >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value ={student}
        onChange={(event)=> setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
        value={interviewer}
        onChange={setInterviewer}
        interviewers={props.interviewers}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>
)

}

export default Form;