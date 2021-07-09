export function getAppointmentsForDay(state, day) {
  const appointments = [];

  state.days.filter(aDay => aDay.name === day)
    .forEach(aDay => aDay.appointments.forEach(id => appointments.push(state.appointments[id])));

  return appointments;
}

export function getInterview(state, interview) {
  const newInterview = {...interview};
  const interviewerNumber = newInterview.interviewer;
  const interviewers = state.interviewers
  if (newInterview && interviewerNumber) {
    newInterview.interviewer = interviewers[interviewerNumber]
    return newInterview
  }
  return null
};

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  state.days.filter(aDay => aDay.name === day)
  .forEach(aDay => aDay.interviewers.forEach(id => interviewers.push(state.interviewers[id])));
  
  return interviewers;
}

