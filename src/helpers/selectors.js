const getAppointmentsForDay = (state, day) => {
  const appointments = [];
  
  state.days.filter(aDay => aDay.name === day)
            .forEach(aDay => aDay.appointments.forEach(id => appointments.push(state.appointments[id])));
            
  return appointments;
}

const getInterview = (state, interview) => {
  const interviewers = state.interviewers
  const interviewerNumber = interview && interview.interviewer;
  if (interviewerNumber && interviewers[interviewerNumber]) {
    interview.interviewer = interviewers[interviewerNumber]
    return interview;
  }
  return null
};

module.exports = { getAppointmentsForDay, getInterview }