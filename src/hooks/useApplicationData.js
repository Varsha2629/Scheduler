import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  const spotCounter = (action) => {
    const copyDays = [...state.days];

    const modifier = action === "book" ? -1 : 1;
    for (let day in copyDays) {
      if (copyDays[day].name === state.day) {
        copyDays[day].spots += modifier;
      }
    }
    return copyDays;
  };

  const bookInterview = (id, interview, isEdit) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (!isEdit) {
      spotCounter("book");
    }

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        // getSpotsByDay(id, { ...state, appointments });

        return setState({ ...state, appointments });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    spotCounter("cancle");
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      return setState({ ...state, appointments });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
