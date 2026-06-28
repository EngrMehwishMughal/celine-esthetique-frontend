/**

 * Client form — step 4 of booking.

 * Collects name, email, phone, and optional notes. Logged-in users can auto-fill.

 */

// User icon for the signed-in banner

import { FaUserCircle } from "react-icons/fa";



// Contact details form controlled by the parent page

const ClientForm = ({ formData, onChange, errors, currentUser, onAutofill }) => {

  // Field config — keeps the form DRY (don't repeat yourself)

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

    <div className="w-full max-w-[540px] mx-auto flex flex-col items-center px-2 sm:px-4">

      {/* Section title */}

      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-3 text-center">

        Your Details

      </h2>

      {/* Subtitle explaining why we need contact info */}

      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-7 sm:mb-9 px-2">

        We will send your confirmation to this contact

      </p>



      {/* Auto-fill banner when the client is logged in */}

      {currentUser?.isLoggedIn && (

        <div className="w-full mb-7 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-[#FFF5F8] border border-[#E1709A]/20 px-4 py-3.5 sm:px-5">

          {/* Icon and "Signed in as …" text */}

          <div className="flex items-center gap-3 min-w-0 flex-1">

            <FaUserCircle className="text-[#E1709A] text-[22px] shrink-0" />

            <p className="font-[Montserrat] text-[12px] text-[#1A1A1A] min-w-0">

              Signed in as{" "}

              <span className="font-bold">

                {currentUser.firstName} {currentUser.lastName}

              </span>

            </p>

          </div>

          {/* Button to copy profile into the form fields */}

          <button

            type="button"

            onClick={onAutofill}

            className="shrink-0 inline-flex items-center justify-center rounded-[8px] bg-[#E1709A] px-4 py-2 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#D85A87]"

          >

            Use my details

          </button>

        </div>

      )}



      {/* All form fields with spacing between groups */}

      <div className="w-full space-y-6 sm:space-y-7">

        {/* First row: first name and last name side by side on larger screens */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          {fields.slice(0, 2).map(({ id, label, type, placeholder, required }) => (

            <div key={id}>

              {/* Label with red asterisk if required */}

              <label

                htmlFor={id}

                className="block font-[Montserrat] text-[11px] sm:text-[12px] font-semibold uppercase tracking-wide text-[#1A1A1A] mb-2.5"

              >

                {label} {required && <span className="text-[#E1709A]">*</span>}

              </label>

              {/* Text input bound to formData[id] */}

              <input

                id={id}

                type={type}

                value={formData[id]}

                onChange={(e) => onChange(id, e.target.value)}

                placeholder={placeholder}

                className={`w-full h-[48px] sm:h-[52px] px-6 rounded-[10px] border font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none transition-colors ${

                  errors[id]

                    ? "border-red-400 focus:border-red-400"

                    : "border-[#E8E8E8] focus:border-[#E1709A]"

                }`}

              />

              {/* Validation message under the field if present */}

              {errors[id] && (

                <p className="mt-1.5 font-[Montserrat] text-[11px] text-red-500">{errors[id]}</p>

              )}

            </div>

          ))}

        </div>



        {/* Email and phone — full width, one per row */}

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

              className={`w-full h-[48px] sm:h-[52px] px-6 rounded-[10px] border font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none transition-colors ${

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



        {/* Optional notes textarea */}

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

            className="w-full px-6 py-4 sm:py-5 rounded-[10px] border border-[#E8E8E8] font-[Montserrat] text-[13px] text-[#1A1A1A] placeholder:text-[#BBBBBB] outline-none focus:border-[#E1709A] transition-colors resize-none"

          />

        </div>

      </div>

    </div>

  );

};



export default ClientForm;

