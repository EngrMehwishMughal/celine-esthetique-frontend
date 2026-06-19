const StatsCard = ({ title, value }) => {
    return (
      <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
        <p className="font-['Montserrat'] text-[14px] text-[#9CA3AF]">
          {title}
        </p>
        <h2 className="font-['Playfair_Display'] text-[30px] text-[#D4AF37] mt-2">
          {value}
        </h2>
      </div>
    );
  };
  
  export default StatsCard;