const ClientForm = ({ formData, onChange, errors }) => {
  const fields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      required: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+41 79 000 00 00",
      required: true,
    },
  ];

  return (
    <div>
      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-2 text-center">
        Your Details
      </h2>
      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-8 sm:mb-10">
        We will send your confirmation to this contact
      </p>

      <div className="max-w-[520px] mx-auto space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {fields.slice(0, 2).map(({ id, label, type, placeholder, required }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block font-[Montserrat] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide text-[#1A1A1A] mb-2"
              >
                {label} {required && <span className="text-[#E1709A]">*</span>}
              </label>
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={(e) => onChange(id, e.target.value)}
                placeholder={placeholder}
                className={`w-full h-[46px] sm:h-[48px] px-4 rounded-[10px] border font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none transition-colors ${
                  errors[id]
                    ? "border-red-400 focus:border-red-400"
                    : "border-[#E8E8E8] focus:border-[#E1709A]"
                }`}
              />
              {errors[id] && (
                <p className="mt-1.5 font-[Montserrat] text-[11px] text-red-500">{errors[id]}</p>
              )}
            </div>
          ))}
        </div>

        {fields.slice(2).map(({ id, label, type, placeholder, required }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block font-[Montserrat] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide text-[#1A1A1A] mb-2"
            >
              {label} {required && <span className="text-[#E1709A]">*</span>}
            </label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={(e) => onChange(id, e.target.value)}
              placeholder={placeholder}
              className={`w-full h-[46px] sm:h-[48px] px-4 rounded-[10px] border font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none transition-colors ${
                errors[id]
                  ? "border-red-400 focus:border-red-400"
                  : "border-[#E8E8E8] focus:border-[#E1709A]"
              }`}
            />
            {errors[id] && (
              <p className="mt-1.5 font-[Montserrat] text-[11px] text-red-500">{errors[id]}</p>
            )}
          </div>
        ))}

        <div>
          <label
            htmlFor="notes"
            className="block font-[Montserrat] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide text-[#1A1A1A] mb-2"
          >
            Special Requests <span className="text-[#999999] font-normal normal-case">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Any allergies, preferences, or notes..."
            rows={4}
            className="w-full px-4 py-3 rounded-[10px] border border-[#E8E8E8] font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none focus:border-[#E1709A] transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
