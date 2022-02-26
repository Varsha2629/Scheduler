import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors"
import axios from "axios";
  
export default function Application() {

const [state, setState] = useState({
  day: "Monday",
  days: [], 
  appointments: {},
  interviewers: {}
});
// const setDays = (days) => {setState(prev => ({ ...prev, days })); }
const appointments = getAppointmentsForDay(state, state.day);

const schedule = appointments.map((appointment) => {
  // console.log(appointment)
  const interview = getInterview(state, appointment.interview);
 
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});
const setDay = (day) => setState({...state, day});


useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    
    ]).then(response => { 
      // console.log(response[2].data)
      setState(prev => ({...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))      
    })
   
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
