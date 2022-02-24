import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss'

const InterviewerList = (props) => {

  const InterviewerList = props.interviewers
  const newList = InterviewerList.map((obj) => 

    <InterviewerListItem key={obj.id} name={obj.name} avatar={obj.avatar}
    selected={obj.id === props.value} setInterviewer={()=> props.onChange(obj.id)} /> 
    
  )
  return (
   <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{newList}</ul>
    </section>
  )
}

export default InterviewerList;