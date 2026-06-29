
const AdminInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
    />
  );
};

export default AdminInput;