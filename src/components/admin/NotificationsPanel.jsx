const notifications = [
  { title: "New appointment request", time: "10 mins ago" },
  { title: "Payment received from Sophie", time: "25 mins ago" },
  { title: "Review waiting for approval", time: "1 hour ago" },
];

const NotificationsPanel = () => {
  return (
    <div className="mt-8 rounded-2xl bg-white p-4 shadow-md md:p-6">
      <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-softPink p-4 transition-all hover:bg-softPink/20"
          >
            <p className="font-body text-sm font-medium text-darkText md:text-base">
              {item.title}
            </p>

            <p className="mt-1 font-body text-xs text-greyText md:text-sm">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;