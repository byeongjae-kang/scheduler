import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

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
    id: 1,
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
