/**
 * Profile page — where clients view and edit their personal info.
 * Also lets them toggle email/SMS reminders and sign out.
 */
// Import useState for edit mode, saved message, profile fields, and preferences
import { useState } from "react";
// Import Link for navigation back to dashboard
import { Link } from "react-router-dom";
// Icons for profile fields, stats, notifications, and sign out
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaPen,
  FaCheck,
  FaBell,
  FaCalendarAlt,
  FaHistory,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";
// Shared dashboard layout wrapper (narrow column)
import DashboardShell from "../components/dashboard/DashboardShell";
// Default user data used to pre-fill the profile form
import { currentUser } from "../utils/constants/currentUser";
// Hook to get upcoming and history counts for the stats row
import { useAppointments } from "../hooks/useAppointments";

// Turns a date like "2024-03-15" into "March 2024" for display
const formatMemberSince = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

// On/off switch used for notification preferences
const Toggle = ({ enabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    onClick={onChange}
    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
      enabled ? "bg-[#E1709A]" : "bg-[#DDDDDD]"
    }`}
  >
    {/* Sliding white circle — moves right when enabled */}
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
        enabled ? "left-6" : "left-1"
      }`}
    />
  </button>
);

// One profile field — shows as text normally, becomes an input when editing
const InfoField = ({ icon: Icon, label, value, editing, onChange, type = "text" }) => (
  <div>
    {/* Field label above the input or read-only box */}
    <label className="mb-2 block font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
      {label}
    </label>
    {editing ? (
      /* Editable text input when in edit mode */
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[50px] w-full rounded-[10px] border border-[#E8E8E8] px-5 font-[Montserrat] text-[13px] text-[#1A1A1A] outline-none transition-colors focus:border-[#E1709A]"
      />
    ) : (
      /* Read-only grey box with icon when not editing */
      <div className="flex h-[50px] items-center gap-3 rounded-[10px] bg-[#FAFAFA] px-5 ring-1 ring-[#F0F0F0]">
        <Icon className="text-[13px] text-[#E1709A]" />
        <span className="font-[Montserrat] text-[13px] font-semibold text-[#1A1A1A]">{value}</span>
      </div>
    )}
  </div>
);

// Main profile page component
const ProfilePage = () => {
  // Get appointment counts for the stats row in the banner
  const { upcoming, history } = useAppointments();
  // true = form fields are editable
  const [editing, setEditing] = useState(false);
  // briefly true after saving to show a success message
  const [saved, setSaved] = useState(false);
  // Saved profile values (what is shown when not editing)
  const [profile, setProfile] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
  });
  // Temporary copy of profile while user is editing — discarded on cancel
  const [draft, setDraft] = useState(profile);
  // Notification preference toggles (email, SMS, promotions)
  const [prefs, setPrefs] = useState(currentUser.preferences);

  // Update one field in the draft while editing
  const updateDraft = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));
  // Flip a notification preference on or off
  const togglePref = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  // Enter edit mode — copy saved profile into draft
  const handleEdit = () => {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  };

  // Save draft to profile and exit edit mode
  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    // Hide success message after 2.5 seconds
    setTimeout(() => setSaved(false), 2500);
  };

  // Full name shown in the profile banner
  const fullName = `${profile.firstName} ${profile.lastName}`;

  // Two quick stats shown under the profile photo
  const stats = [
    { icon: FaCalendarAlt, label: "Upcoming", value: upcoming.length },
    { icon: FaHistory, label: "Past Visits", value: history.length },
  ];

  return (
    <DashboardShell narrow>
      {/* Profile banner — photo, name, member since, quick stats */}
      <div className="mb-8 overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
        {/* Pink gradient strip at the top of the banner */}
        <div className="h-24 bg-gradient-to-r from-[#E1709A] to-[#D66291] sm:h-28" />
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          {/* Photo, name, and dashboard link row */}
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:-mt-14">
            <div className="flex items-end gap-4">
              {/* Profile avatar image */}
              <img
                src={currentUser.avatar}
                alt={fullName}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:h-28 sm:w-28"
              />
              <div className="pb-1">
                {/* User's full name in script font */}
                <h1 className="font-[Great_Vibes] text-[32px] leading-none text-[#1A1A1A] sm:text-[38px]">
                  {fullName}
                </h1>
                {/* How long they have been a member */}
                <p className="mt-1 font-[Montserrat] text-[11px] text-[#888888]">
                  Member since {formatMemberSince(currentUser.memberSince)}
                </p>
              </div>
            </div>
            {/* Link back to the main dashboard */}
            <Link
              to="/dashboard"
              className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#E8E8E8] bg-white px-5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:border-[#E1709A]/40 hover:bg-[#FFF5F8] hover:text-[#E1709A]"
            >
              <FaCalendarAlt className="text-[11px]" />
              My Dashboard
            </Link>
          </div>

          {/* Two stat boxes: upcoming count and past visits count */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-[320px]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-[14px] bg-[#FAFAFA] px-4 py-3 ring-1 ring-[#F0F0F0]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF5F8]">
                  <stat.icon className="text-[13px] text-[#E1709A]" />
                </div>
                <div>
                  <p className="font-[Montserrat] text-[16px] font-bold leading-none text-[#1A1A1A]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 font-[Montserrat] text-[10px] uppercase tracking-wide text-[#999999]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editable name, email, and phone */}
      <section className="mb-8 overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
        {/* Section header with Edit or Save button */}
        <div className="flex items-center justify-between gap-3 border-b border-[#F5F5F5] px-6 py-5 sm:px-8">
          <div>
            <h2 className="font-[Montserrat] text-[16px] font-bold text-[#1A1A1A] sm:text-[18px]">
              Personal Information
            </h2>
            <p className="mt-0.5 font-[Montserrat] text-[12px] text-[#888888]">
              Keep your contact details up to date.
            </p>
          </div>
          {editing ? (
            /* Save button — visible while editing */
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-[10px] bg-[#E1709A] px-5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#D85A87]"
            >
              <FaCheck className="text-[11px]" />
              Save
            </button>
          ) : (
            /* Edit button — visible when viewing read-only profile */
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-[10px] border border-[#E8E8E8] bg-white px-5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:border-[#E1709A]/40 hover:text-[#E1709A]"
            >
              <FaPen className="text-[10px]" />
              Edit
            </button>
          )}
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-7">
          {/* Green success banner — shown briefly after saving */}
          {saved && (
            <div className="mb-5 flex items-center gap-2 rounded-[12px] bg-[#F0FBF4] px-4 py-3 font-[Montserrat] text-[12px] font-semibold text-[#1E9E55] ring-1 ring-[#1E9E55]/15">
              <FaCheck className="text-[11px]" />
              Your profile has been updated.
            </div>
          )}
          {/* Four profile fields in a two-column grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoField icon={FaUser} label="First Name" value={editing ? draft.firstName : profile.firstName} editing={editing} onChange={(v) => updateDraft("firstName", v)} />
            <InfoField icon={FaUser} label="Last Name" value={editing ? draft.lastName : profile.lastName} editing={editing} onChange={(v) => updateDraft("lastName", v)} />
            <InfoField icon={FaEnvelope} label="Email" type="email" value={editing ? draft.email : profile.email} editing={editing} onChange={(v) => updateDraft("email", v)} />
            <InfoField icon={FaPhone} label="Phone" type="tel" value={editing ? draft.phone : profile.phone} editing={editing} onChange={(v) => updateDraft("phone", v)} />
          </div>
          {/* Cancel link — discards draft and exits edit mode */}
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="mt-5 font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#999999] hover:text-[#666666]"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* Email / SMS / promo toggles */}
      <section className="mb-8 overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 border-b border-[#F5F5F5] px-6 py-5 sm:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F8]">
            <FaBell className="text-[15px] text-[#E1709A]" />
          </div>
          <div>
            <h2 className="font-[Montserrat] text-[16px] font-bold text-[#1A1A1A] sm:text-[18px]">
              Notifications
            </h2>
            <p className="mt-0.5 font-[Montserrat] text-[12px] text-[#888888]">
              Choose how you'd like to hear from us.
            </p>
          </div>
        </div>
        {/* List of three notification toggles */}
        <div className="divide-y divide-[#F5F5F5] px-6 sm:px-8">
          {[
            { key: "emailReminders", title: "Email reminders", desc: "Appointment confirmations & reminders by email." },
            { key: "smsReminders", title: "SMS reminders", desc: "Text reminders before your appointment." },
            { key: "promotions", title: "Promotions & offers", desc: "Occasional news about offers and new treatments." },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-5">
              <div className="min-w-0">
                <p className="font-[Montserrat] text-[13px] font-bold text-[#1A1A1A]">{item.title}</p>
                <p className="mt-0.5 font-[Montserrat] text-[12px] text-[#888888]">{item.desc}</p>
              </div>
              <Toggle enabled={prefs[item.key]} onChange={() => togglePref(item.key)} />
            </div>
          ))}
        </div>
      </section>

      {/* Sign out button */}
      <section className="overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F8]">
              <FaShieldAlt className="text-[15px] text-[#E1709A]" />
            </div>
            <div>
              <p className="font-[Montserrat] text-[13px] font-bold text-[#1A1A1A]">Account &amp; security</p>
              <p className="mt-0.5 font-[Montserrat] text-[12px] text-[#888888]">Manage your sign-in.</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[#ECECEC] bg-white px-5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#888888] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <FaSignOutAlt className="text-[12px]" />
            Sign Out
          </button>
        </div>
      </section>
    </DashboardShell>
  );
};

export default ProfilePage;
