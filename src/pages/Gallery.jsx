import Header from "../components/common/Header";

const beforeAfterItems = [
  {
    id: 1,
    title: "Hydra Facial Glow",
    category: "Skincare",
    before:
      "https://images.unsplash.com/photo-1570172619642-d3b0955d624a?w=600&h=700&fit=crop",
    after:
      "https://images.unsplash.com/photo-1516975080664-ed2f6f585b45?w=600&h=700&fit=crop",
  },
  {
    id: 2,
    title: "Anti-Aging Treatment",
    category: "Aesthetics",
    before:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=700&fit=crop",
    after:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop",
  },
  {
    id: 3,
    title: "Skin Rejuvenation",
    category: "Skincare",
    before:
      "https://images.unsplash.com/photo-1596755389378-c179d4f71103?w=600&h=700&fit=crop",
    after:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=700&fit=crop",
  },
  {
    id: 4,
    title: "Complexion Brightening",
    category: "Facial Care",
    before:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=700&fit=crop",
    after:
      "https://images.unsplash.com/photo-1570172619642-d3b0955d624a?w=600&h=700&fit=crop",
  },
];

const salonImages = [
  {
    id: 1,
    alt: "Elegant salon reception",
    src: "https://images.unsplash.com/photo-1560066984-138d9834dfe5?w=800&h=600&fit=crop",
    wide: true,
  },
  {
    id: 2,
    alt: "Luxury treatment room",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0e?w=600&h=700&fit=crop",
  },
  {
    id: 3,
    alt: "Professional nail station",
    src: "https://images.unsplash.com/photo-1596178065887-1194b9797c46?w=600&h=700&fit=crop",
  },
  {
    id: 4,
    alt: "Relaxing spa lounge",
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=700&fit=crop",
  },
  {
    id: 5,
    alt: "Beauty consultation area",
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=700&fit=crop",
  },
  {
    id: 6,
    alt: "Salon interior detail",
    src: "https://images.pexels.com/photos/19664877/pexels-photo-19664877.jpeg",
    wide: true,
  },
];

const BeforeAfterCard = ({ item }) => (
  <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(183,110,121,0.15)] transition-shadow duration-300">
    <div className="px-4 sm:px-5 pt-5 pb-3">
      <span className="inline-block text-[11px] uppercase tracking-[2px] text-[#B76E79] font-medium mb-1">
        {item.category}
      </span>
      <h3 className="font-['Playfair_Display'] text-[20px] sm:text-[22px] font-bold text-[#1A1A1A]">
        {item.title}
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-0">
      <div className="relative group">
        <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/80 text-white text-[10px] sm:text-[11px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full">
          Before
        </span>
        <img
          src={item.before}
          alt={`${item.title} before treatment`}
          className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative group border-t sm:border-t-0 sm:border-l border-[#F9E4E0]">
        <span className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-[#1A1A1A] text-[10px] sm:text-[11px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full">
          After
        </span>
        <img
          src={item.after}
          alt={`${item.title} after treatment`}
          className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </article>
);

const SalonImage = ({ image }) => (
  <figure
    className={`group relative overflow-hidden rounded-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.06)] ${
      image.wide ? "sm:col-span-2" : ""
    }`}
  >
    <img
      src={image.src}
      alt={image.alt}
      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
        image.wide ? "h-[220px] sm:h-[280px] md:h-[320px]" : "h-[220px] sm:h-[260px] md:h-[300px]"
      }`}
      loading="lazy"
    />
    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1A1A]/70 to-transparent px-4 py-4 sm:py-5">
      <p className="font-['Montserrat'] text-[12px] sm:text-[13px] text-white font-medium tracking-wide">
        {image.alt}
      </p>
    </figcaption>
  </figure>
);

const Gallery = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />

      <section className="bg-[#B76E79] px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 text-center">
        <p className="font-['Montserrat'] text-[12px] sm:text-[13px] tracking-[4px] uppercase text-[#F9E4E0] mb-3">
          Our Work & Space
        </p>
        <h1 className="font-['Playfair_Display'] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold text-white leading-tight">
          Gallery
        </h1>
        <p className="font-['Montserrat'] text-[14px] sm:text-[15px] text-white/85 mt-4 max-w-2xl mx-auto leading-relaxed">
          Discover real transformations and explore the elegant atmosphere of
          Celine Esthétique in Lausanne City Centre.
        </p>
      </section>

      <section className="bg-[#F9E4E0] px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block w-10 h-[2px] bg-[#D4AF37] mb-4" />
            <h2 className="font-['Playfair_Display'] text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#1A1A1A]">
              Before & After
            </h2>
            <p className="font-['Montserrat'] text-[14px] sm:text-[15px] text-[#9CA3AF] mt-3 max-w-xl mx-auto">
              Visible results from our premium skincare and aesthetic treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {beforeAfterItems.map((item) => (
              <BeforeAfterCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block w-10 h-[2px] bg-[#D4AF37] mb-4" />
            <h2 className="font-['Playfair_Display'] text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#1A1A1A]">
              Salon Pictures
            </h2>
            <p className="font-['Montserrat'] text-[14px] sm:text-[15px] text-[#9CA3AF] mt-3 max-w-xl mx-auto">
              Step inside our luxurious beauty salon designed for comfort and relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {salonImages.map((image) => (
              <SalonImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F9E4E0] px-4 md:px-12 lg:px-16 py-12 md:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#1A1A1A] mb-4">
            Ready for Your Transformation?
          </h2>
          <p className="font-['Montserrat'] text-[14px] sm:text-[15px] text-[#9CA3AF] mb-6">
            Book an appointment and experience the Celine Esthétique difference.
          </p>
          <button
            type="button"
            className="bg-[#D4AF37] text-[#1A1A1A] px-8 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#C5A028] transition-colors"
          >
            BOOK NOW
          </button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
