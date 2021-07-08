export function getAppointmentsForDay(state, day) {
  const appointments = [];
  
  state.days.filter(aDay => aDay.name === day)
            .forEach(aDay => aDay.appointments.forEach(id => appointments.push(state.appointments[id])));
            
  return appointments;
  //... returns an array of appointments for that day
}