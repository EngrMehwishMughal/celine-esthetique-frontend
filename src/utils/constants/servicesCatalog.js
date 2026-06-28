// Import icons shown next to each service category on the Services page
import {
  FaPaintBrush,
  FaHandSparkles,
  FaShoePrints,
  FaFeatherAlt,
  FaEye,
  FaSpa,
  FaMagic,
} from "react-icons/fa";

/**
 * Full treatment catalogue for the public Services page.
 * Kept separate from `bookingServices` (the booking flow) so the marketing
 * catalogue can grow freely without touching the booking logic.
 *
 * Each category: { id, name, tagline, icon, accent, services: [...] }
 * Each service:  { id, name, duration (min), price (CHF), note?, popular? }
 */
// All service groups and their treatments for marketing and booking
export const serviceCategories = [
  // Category: manicures, gel, and nail treatments
  {
    id: "nail-care",
    name: "Nail Care",
    tagline: "Manicures, gel & lasting finishes for beautiful nails.",
    icon: FaPaintBrush,
    accent: "#E1709A",
    services: [
      { id: "manicure", name: "Manicure", duration: 45, price: 45, popular: true },
      { id: "pedicure", name: "Pedicure", duration: 50, price: 55 },
      { id: "gel-application", name: "Gel Application", duration: 60, price: 65, popular: true },
      { id: "semi-permanent-varnish", name: "Semi-Permanent Varnish", duration: 45, price: 50 },
      { id: "nail-repair", name: "Nail Repair", duration: 20, price: 15 },
      { id: "nail-biting-treatment", name: "Nail Biting Treatment", duration: 60, price: 70 },
      { id: "babyboomer-installation", name: "Babyboomer Installation", duration: 90, price: 95 },
    ],
  },
  // Category: gel fills and natural nail strengthening
  {
    id: "hands",
    name: "Hands",
    tagline: "Fillings, strengthening & natural nail care.",
    icon: FaHandSparkles,
    accent: "#D66291",
    services: [
      { id: "gel-filling", name: "Gel Filling", duration: 60, price: 60, note: "2 / 3 / 4 / 5 weeks" },
      { id: "strengthening-natural-nails", name: "Strengthening Natural Nails", duration: 45, price: 50 },
      { id: "removal-application", name: "Removal + Application", duration: 75, price: 80 },
    ],
  },
  // Category: pedicures and foot spa services
  {
    id: "feet",
    name: "Feet",
    tagline: "From quick touch-ups to a full foot spa ritual.",
    icon: FaShoePrints,
    accent: "#E1709A",
    services: [
      { id: "foot-beauty", name: "Foot Beauty", duration: 45, price: 55 },
      { id: "foot-spa", name: "Foot Spa", duration: 60, price: 70, popular: true },
      { id: "professional-pedicure", name: "Professional Pedicure", duration: 60, price: 75 },
      { id: "simple-foot-beauty", name: "Simple Foot Beauty", duration: 30, price: 40 },
    ],
  },
  // Category: waxing for face and body
  {
    id: "hair-removal",
    name: "Hair Removal",
    tagline: "Gentle, precise waxing for face and body.",
    icon: FaFeatherAlt,
    accent: "#D66291",
    services: [
      { id: "upper-lip", name: "Upper Lip", duration: 10, price: 15 },
      { id: "chin", name: "Chin", duration: 10, price: 15 },
      { id: "cheek", name: "Cheek", duration: 15, price: 20 },
      { id: "full-face", name: "Full Face", duration: 30, price: 45 },
      { id: "eyebrow-shaping", name: "Eyebrow Shaping", duration: 20, price: 25, popular: true },
      { id: "half-leg", name: "Half Leg", duration: 30, price: 40 },
      { id: "full-leg", name: "Full Leg", duration: 45, price: 60 },
      { id: "mid-arm", name: "Mid-Arm", duration: 20, price: 30 },
      { id: "armpit", name: "Armpit", duration: 15, price: 25 },
      { id: "simple-bikini", name: "Simple Bikini", duration: 20, price: 35 },
      { id: "full-bikini", name: "Full Bikini", duration: 40, price: 55 },
      { id: "full-body-wax", name: "Full Body Wax", duration: 90, price: 140 },
    ],
  },
  // Category: lashes and brow treatments
  {
    id: "eyes",
    name: "Eyes",
    tagline: "Lashes and brows that open up your look.",
    icon: FaEye,
    accent: "#E1709A",
    services: [
      { id: "eyelash-extensions", name: "Eyelash Extensions", duration: 120, price: 130, popular: true },
      { id: "eyelash-lift", name: "Eyelash Lift", duration: 60, price: 85 },
      { id: "brow-lash-tinting", name: "Eyebrow & Eyelash Tinting", duration: 40, price: 55 },
    ],
  },
  // Category: head spa and scalp care
  {
    id: "head-hair",
    name: "Head & Hair",
    tagline: "Relaxing scalp rituals & revitalising care.",
    icon: FaSpa,
    accent: "#D66291",
    services: [
      { id: "head-spa-japanese", name: "Head Spa Japanese", duration: 60, price: 110, popular: true },
      { id: "scalp-massage", name: "Scalp Massage", duration: 30, price: 60 },
      { id: "hair-relaxation", name: "Hair Relaxation", duration: 45, price: 75 },
      { id: "revitalization-treatment", name: "Revitalization Treatment", duration: 50, price: 90 },
      { id: "scalp-moisturizing", name: "Scalp Moisturizing", duration: 40, price: 70 },
    ],
  },
  // Category: miscellaneous extra treatments
  {
    id: "other",
    name: "Other",
    tagline: "Additional professional treatments.",
    icon: FaMagic,
    accent: "#E1709A",
    services: [
      { id: "upper-lip-face-removal", name: "Upper Lip & Face Hair Removal", duration: 30, price: 40 },
      { id: "professional-hair-removal", name: "Professional Hair Removal", duration: 60, price: 80 },
    ],
  },
];

// Total number of individual services across all categories
export const totalServiceCount = serviceCategories.reduce(
  (sum, category) => sum + category.services.length,
  0
);

/**
 * Optional add-ons offered during booking (feature: Add-ons).
 * Each add-on contributes extra time and price to the appointment total.
 */
// Extra treatments the client can add during checkout
export const bookingAddOns = [
  {
    id: "extra-massage",
    name: "Extra Massage",
    description: "15 min of relaxing hand, foot or scalp massage.",
    duration: 15,
    price: 25,
  },
  {
    id: "paraffin-treatment",
    name: "Paraffin Treatment",
    description: "Deep hydration ritual for hands or feet.",
    duration: 15,
    price: 20,
  },
  {
    id: "nail-art",
    name: "Nail Art Design",
    description: "Custom design on two accent nails.",
    duration: 20,
    price: 18,
  },
  {
    id: "express-dry",
    name: "Express Dry Finish",
    description: "Quick-dry top coat so you're ready to go.",
    duration: 5,
    price: 10,
  },
];

/**
 * Flat list of every service in a booking-friendly shape
 * ({ id, name, category, duration, price, ... }). This is the single source
 * of truth consumed by the booking flow and the dashboard.
 */
// Turn nested categories into one flat array for the booking picker
export const flatBookingServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    id: service.id,
    name: service.name,
    category: category.name,
    categoryId: category.id,
    accent: category.accent,
    duration: service.duration,
    price: service.price,
    note: service.note ?? null,
  }))
);
