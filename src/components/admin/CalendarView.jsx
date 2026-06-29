import { Clock3, CalendarDays } from "lucide-react";

const bookings = [
  {
    time: "09:00",
    client: "Sophie Martin",
    service: "Manicure",
    status: "Confirmed",
  },
  {
    time: "11:30",
    client: "Emma Laurent",
    service: "Eyelash Lift",
    status: "Pending",
  },
  {
    time: "14:00",
    client: "Amina Khan",
    service: "Head Spa",
    status: "Confirmed",
  },
];

const CalendarView = () => {
  return (
    <section className="rounded-[24px] border border-[#F1E4E8] bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.06)] md:p-6">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Today’s Schedule
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Tuesday, 29 June • Salon bookings
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-softPink text-primaryPink">
          <CalendarDays size={18} />
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="space-y-3">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col gap-4
              rounded-[18px]
              border border-[#F1E4E8]
              p-4
              transition-all duration-300
              hover:bg-[#FFF7F9]
              hover:shadow-sm
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF3E0] text-gold">
                <Clock3 size={18} />
              </div>

              <div>
                <p className="font-body text-sm font-semibold text-darkText md:text-base">
                  {item.client}
                </p>

                <p className="mt-1 text-xs text-greyText">
                  {item.service}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <span className="font-body text-sm font-semibold text-primaryPink">
                {item.time}
              </span>

              <span
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold
                  ${
                    item.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CalendarView;