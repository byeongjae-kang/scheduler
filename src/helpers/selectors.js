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

const getInterviewersForDay = (state, day) => {
  const interviewers = [];
  state.days.filter(aDay => aDay.name === day)
  .forEach(aDay => aDay.interviewers.forEach(id => interviewers.push(state.interviewers[id])));
  
  return interviewers;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay }

// { "id": 2, "name": "Tuesday", "appointments": [6, 7, 8, 9, 10], "interviewers": [1, 2, 4, 7, 10], "spots": 4 }
