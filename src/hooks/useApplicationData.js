import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          ...action.value
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          ...action.value
        };
      case SET_INTERVIEW:
        return {
          ...state,
          ...action.value
        };
      default:
        throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const day = [...state.days].find((item) => item.appointments.includes(id));
    const availableSpots = day.appointments.filter((id) => !appointments[id].interview);
    const days = [...state.days];

    day.spots = availableSpots.length;
    days[day.id - 1] = day;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments, days } });
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    const day = [...state.days].find((item) => item.appointments.includes(id));
    const availableSpots = day.appointments.filter((id) => !appointments[id].interview);
    const days = [...state.days];

    day.spots = availableSpots.length;
    days[day.id - 1] = day;

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        value: { appointments, days }
      });
    });
  };

  const setDay = (day) => dispatch({ type: SET_DAY, value: { day } });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
