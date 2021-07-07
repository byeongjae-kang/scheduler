import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: { 
      student: "Lydia Miller-Jones", 
      interviewer: { 
        id: 5, 
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg" 
      } 
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then(response => {
        console.log(response.data);
        setDays(response.data)
      })
  } , [day]);
  
  const rendorAppointments = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {rendorAppointments/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
