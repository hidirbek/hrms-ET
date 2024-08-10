import React, { useState, useEffect } from "react";
import { Layout } from "../../components";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

import apiRequest from "../../service/request";

const localizer = momentLocalizer(moment);
const allViews = Object.keys(Views).map((k) => Views[k]);
// console.log(allViews);

const EventComponent = ({ event }) => {
  return (
    <div>
      {event.name} <br /> <small>{event.description}</small>
    </div>
  );
};

const MyCalendar = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = year + "-" + month + "-" + date;

  const [events, setEvents] = useState(null);

  const getAnnouncements = async () => {
    const response = await apiRequest.get(`/events/get_all`);
    // console.log(response);
    setEvents(response);
  };
  useEffect(() => {
    getAnnouncements();
  }, []);

  // const events = [
  //   {
  //     id: 0,
  //     name: "Holiday",
  //     description: "this is description",
  //     allDay: true,
  //     start: new Date(2024, 7, 6),
  //     end: new Date(2024, 7, 6),
  //   },
  //   {
  //     id: 1,
  //     name: "Holiday",
  //     description: "this is description",
  //     allDay: true,
  //     start: new Date(2024, 7, 6),
  //     end: new Date(2024, 7, 6),
  //   },
  //   {
  //     id: 2,
  //     name: "Holiday",
  //     description: "this is description",
  //     allDay: true,
  //     start: new Date(2024, 7, 6),
  //     end: new Date(2024, 7, 6),
  //   },
  //   {
  //     id: 3,
  //     name: "Holiday",
  //     description: "this is description",
  //     allDay: true,
  //     start: new Date(2024, 7, 5),
  //     end: new Date(2024, 7, 5),
  //   },
  // ];

  return (
    <div>
      <Layout>
        <div className="calendar_page-wrapper">
          <h1 className="page_title">Calendar</h1>
          <div className="calendar">
            {events && (
              <Calendar
                localizer={localizer}
                events={events}
                views={allViews}
                step={60}
                showMultiDayTimes
                defaultDate={currentDate}
                style={{ minHeight: 580 }}
                components={{
                  event: EventComponent,
                }}
              />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MyCalendar;
