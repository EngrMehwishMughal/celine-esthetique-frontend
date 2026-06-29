
const AdminSelect = ({
  name,
  value,
  onChange,
  children,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full
        rounded-[14px]
        border border-softPink
        bg-white
        px-4 py-3
        font-body
        text-darkText
        outline-none
        transition-all duration-300
        focus:border-primaryPink
        focus:ring-2
        focus:ring-softPink
      "
    >
      {children}
    </select>
  );
};

export default AdminSelect;