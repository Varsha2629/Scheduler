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

  const getSpotsByDay = (id, state) => {
    const selectedDay = state.days.filter((day) => {
      return day.appointments.includes(id);
    });
    console.log("selectedDay", selectedDay);
    console.log("spots", selectedDay[0].spots);
    return selectedDay[0].spots;
  };
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log("bookInterview", id);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        getSpotsByDay(id, { ...state, appointments });
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
    console.log("id", id);
    setState({
      ...state,
      appointments,
    });

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      getSpotsByDay(id, { ...state, appointments });
      return setState({ ...state, appointments });
    });
    // .then(data => {

    //   return setState((prev) => {
    //     const {spots, selectedDay} = findSpotsByday(id, prev);
    //     return {...prev,
    //       days: [
    //         ...prev.days.slice(0, selectedDay),
    //         {
    //           ...prev.days[selectedDay],
    //           spots: spots
    //         },
    //         ...prev.days.slice(selectedDay + 1)
    //       ]
    //     }});
    // })
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      // console.log(response[2].data)
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
