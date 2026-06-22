import { useEffect, useState } from "react";
import { getAppointments } from "../services/firebase/appointmentService";
import { getServices } from "../services/firebase/serviceService";

const AdminReports = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  const fetchReportsData = async () => {
    const appointmentsData = await getAppointments();
    const servicesData = await getServices();

    setAppointments(appointmentsData);
    setServices(servicesData);
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (item) => item.status === "completed"
  ).length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const totalServices = services.length;

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-8">
      <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A] mb-8">
        Sales Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <p className="text-[#9CA3AF] text-[14px]">Total Appointments</p>
          <h2 className="text-[#D4AF37] text-[30px] font-bold">
            {totalAppointments}
          </h2>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <p className="text-[#9CA3AF] text-[14px]">Completed</p>
          <h2 className="text-[#87A96B] text-[30px] font-bold">
            {completedAppointments}
          </h2>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <p className="text-[#9CA3AF] text-[14px]">Pending</p>
          <h2 className="text-[#B76E79] text-[30px] font-bold">
            {pendingAppointments}
          </h2>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <p className="text-[#9CA3AF] text-[14px]">Total Services</p>
          <h2 className="text-[#D4AF37] text-[30px] font-bold">
            {totalServices}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] overflow-x-auto">
        <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
          Appointment Report
        </h2>

        <table className="w-full font-['Montserrat'] text-[14px]">
          <thead>
            <tr className="text-left text-[#9CA3AF] border-b">
              <th className="pb-4">Customer</th>
              <th className="pb-4">Service</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item) => (
              <tr key={item.id} className="border-b last:border-none">
                <td className="py-4 text-[#1A1A1A] font-medium">
                  {item.customerName}
                </td>
                <td className="py-4 text-[#9CA3AF]">{item.service}</td>
                <td className="py-4 text-[#9CA3AF]">{item.date}</td>
                <td className="py-4">
                  <span className="bg-[#F9E4E0] text-[#B76E79] px-4 py-2 rounded-full text-[12px] capitalize">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-[#9CA3AF]">
                  No report data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;