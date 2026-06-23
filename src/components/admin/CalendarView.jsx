const bookings = [
  { time: "09:00", client: "Sophie Martin", service: "Manicure" },
  { time: "11:30", client: "Emma Laurent", service: "Eyelash Lift" },
  { time: "14:00", client: "Amina Khan", service: "Head Spa" },
];

const CalendarView = () => {
  return (
    <div className="mt-8 rounded-2xl bg-white p-4 shadow-md md:p-6">
      <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
        Today’s Booking Calendar
      </h2>

      <div className="space-y-4">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border-l-4 border-gold bg-softPink p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-body text-sm font-semibold text-darkText md:text-base">
                {item.client}
              </p>

              <p className="font-body text-xs text-greyText md:text-sm">
                {item.service}
              </p>
            </div>

            <span className="font-body text-sm font-semibold text-primaryPink md:text-base">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;