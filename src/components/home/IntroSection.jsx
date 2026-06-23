import { FaPaintBrush, FaSpa, FaEye, FaShoePrints } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: FaPaintBrush,
    title: "Nails and Pedicure",
    description:
      "So you bite your nails... tired of having nails that break... split... or simply want to have a nice manicure,",
    highlighted: false,
  },
  {
    id: 2,
    icon: FaSpa,
    title: "Aesthetic",
    description:
      "In short. We offer a wide range of facial and body treatments, in the institute, for radiant and long-lasting results.",
    highlighted: true,
  },
  {
    id: 3,
    icon: FaEye,
    title: "Eyelash Lift",
    description:
      "Thanks to the eyelash-by-eyelash application technique, your look will be intensified and more voluminous in no time and without constraints!",
    highlighted: false,
  },
  {
    id: 4,
    icon: FaShoePrints,
    title: "Simple Foot Beauty",
    description:
      "Foot Beauty helps you keep your feet looking their best! From the tips of your toes to the top of your ankles, our team of specialists will make",
    highlighted: false,
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  const isActive = service.highlighted;

  return (
    <article
      className={`w-full rounded-[24px] p-5 sm:p-6 text-left h-full flex flex-col ${
        isActive
          ? "bg-[#D66291] shadow-[0_8px_28px_rgba(214,98,145,0.4)]"
          : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
      }`}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center mb-4 sm:mb-5 shrink-0">
        <Icon className="text-[20px] sm:text-[22px] text-[#D66291]" />
      </div>

      <h3
        className={`font-[Montserrat] text-[12px] sm:text-[13px] font-bold uppercase tracking-wide mb-3 sm:mb-4 ${
          isActive ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {service.title}
      </h3>

      <p
        className={`font-[Montserrat] text-[11px] sm:text-[12px] leading-[1.75] ${
          isActive ? "text-white/95" : "text-[#666666]"
        }`}
      >
        {service.description}
      </p>
    </article>
  );
};

const IntroSection = () => {
  return (
    <section className="w-full bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center">
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="leading-[1.25] mb-8 sm:mb-9 md:mb-10">
              <span className="font-[Great_Vibes] text-[32px] sm:text-[40px] md:text-[46px] lg:text-[48px] text-[#1A1A1A]">
                Celine nail salon{" "}
              </span>
              <span className="font-[Great_Vibes] text-[32px] sm:text-[40px] md:text-[46px] lg:text-[48px] text-[#D66291]">
                Aesthetic
              </span>
              <br />
              <span className="font-[Great_Vibes] text-[32px] sm:text-[40px] md:text-[46px] lg:text-[48px] text-[#1A1A1A]">
                Lausanne city center
              </span>
            </h2>

            <p className="font-[Montserrat] font-normal text-[10px] sm:text-[11px] md:text-[12px] leading-[2] tracking-[0.35px] uppercase text-[#555555] text-center w-full max-w-[92%] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] mx-auto px-1">
              I am at your disposal to offer you manicure and pedicure services
              and aesthetics.
              <br className="hidden min-[520px]:block" />
              <span className="min-[520px]:hidden"> </span>
              My beauty treatments will be individualized and adapted to your
              needs and desires.
            </p>
          </div>

          <div className="w-full mt-14 sm:mt-16 md:mt-[72px] lg:mt-20 flex justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-5 lg:gap-4 w-full max-w-[280px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[860px] xl:max-w-[900px] mx-auto justify-items-center sm:justify-items-stretch">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
