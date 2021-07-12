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
          ...action.value /* insert logic */,
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          ...action.value /* insert logic */,
        };
      case SET_INTERVIEW:
        return {
          ...state,
          ...action.value,
          /* insert logic */
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        axios
          .get("/api/days")
          .then((res) =>
            dispatch({ type: SET_INTERVIEW, value: { days: res.data } })
          )
      );
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      return axios.get("/api/days").then((res) => {
        dispatch(
          {
            type: SET_INTERVIEW,
            value: { appointments, days: res.data },
          }
        );
      });
    });
  };

  const setDay = (day) => dispatch({ type: SET_DAY, value: { day } });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        },
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
