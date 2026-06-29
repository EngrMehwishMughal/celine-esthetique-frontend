import { Bell, CalendarCheck, CreditCard, Star } from "lucide-react";

const notifications = [
  {
    title: "New appointment request",
    time: "10 mins ago",
    type: "appointment",
  },
  {
    title: "Payment received from Sophie",
    time: "25 mins ago",
    type: "payment",
  },
  {
    title: "Review waiting for approval",
    time: "1 hour ago",
    type: "review",
  },
];

const iconMap = {
  appointment: CalendarCheck,
  payment: CreditCard,
  review: Star,
};

const NotificationsPanel = () => {
  return (
    <section className="rounded-[24px] border border-[#F1E4E8] bg-white p-5 shadow-[0_10px_30px_rgba(26,26,26,0.06)] md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Notifications
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Recent salon updates and alerts.
          </p>
        </div>

        <span className="rounded-full bg-softPink px-3 py-1 text-xs font-semibold text-primaryPink">
          3 New
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => {
          const Icon = iconMap[item.type] || Bell;

          return (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-[18px] border border-[#F1E4E8] bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFF7F9] hover:shadow-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-softPink text-primaryPink transition group-hover:bg-primaryPink group-hover:text-white">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold text-darkText md:text-base">
                  {item.title}
                </p>

                <p className="mt-1 font-body text-xs text-greyText">
                  {item.time}
                </p>
              </div>

              <span className="mt-2 h-2 w-2 rounded-full bg-gold" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NotificationsPanel;