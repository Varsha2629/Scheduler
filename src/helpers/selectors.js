
export function getAppointmentsForDay(state, day) {

    const filterDay = state.days.filter((item) => item.name === day);

    if(filterDay.length === 0) {
      return filterDay;
    }

    const appointmentArray = filterDay[0].appointments.map((appointment) => {
      return{...state.appointments[`${appointment}`]};
    })

  return appointmentArray;
}

