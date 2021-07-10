import axios from 'axios';
import { useState, useEffect } from 'react';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => axios.get('/api/days').then(res => setState({...state, days: res.data})))
  }

  const bookInterview = (id, interview) => {
    const newAppointment = {...state.appointments[id], interview: { ...interview }};
    const newAppointments = {...state.appointments, [id]: newAppointment};
    return axios.put(`/api/appointments/${id}`,newAppointment)
      .then(() => setState({...state, newAppointments}))
      .then(() => axios.get('/api/days').then(res => setState({...state, days: res.data})))
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}