import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import { getAppointments } from "../services/firebase/appointmentService";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const appointments = await getAppointments();

    const formattedEvents = appointments.map((item) => {
      // combine date + time
      const startDate = new Date(`${item.date}T${item.time}`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      return {
        title: `${item.customerName} - ${item.service}`,
        start: startDate,
        end: endDate,
      };
    });

    setEvents(formattedEvents);
  };

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-8">
      <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A] mb-8">
        Booking Calendar
      </h1>

      <div className="bg-white rounded-[20px] p-6 h-[700px] shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;