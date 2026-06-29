
const StatusBadge = ({ status }) => {
  const styles = {
    confirmed: "bg-softPink text-primaryPink",

    pending: "bg-yellow-100 text-yellow-600",

    completed: "bg-green-100 text-success",

    cancelled: "bg-red-100 text-danger",

    active: "bg-green-100 text-success",

    blocked: "bg-red-100 text-danger",

    draft: "bg-gray-100 text-greyText",

    published: "bg-softPink text-primaryPink",

    approved: "bg-green-100 text-success",

    rejected: "bg-red-100 text-danger",
    
    open: "bg-green-100 text-success",

    closed: "bg-red-100 text-danger",

    break: "bg-yellow-100 text-yellow-600",

    holiday: "bg-softPink text-primaryPink",
    
    expired: "bg-red-100 text-danger",

    disabled: "bg-gray-100 text-greyText",

    sent: "bg-green-100 text-success",

    scheduled: "bg-yellow-100 text-yellow-600",
  };

  return (
    <span
      className={`
        rounded-full
        px-4 py-2
        text-xs
        font-body
        font-medium
        capitalize
        ${styles[status?.toLowerCase()] || "bg-gray-100 text-greyText"}
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;