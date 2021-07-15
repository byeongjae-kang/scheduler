import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useApplicationData() {
  //types for reducer
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //reducer to update state
  const reducer = (state, action) => {
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

  //hook
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //update hook state and send delete request to server
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

  //update hook state and send put request to server
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

  //update hook state
  const setDay = (day) => dispatch({ type: SET_DAY, value: { day } });

  //send get request to server and update hook state with data received
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
