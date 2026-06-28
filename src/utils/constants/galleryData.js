/**
 * Gallery content. Images use picsum.photos (stable per-seed random photos)
 * as placeholders — swap the URLs for real salon photography later.
 */
// Build a placeholder image URL from a seed string and optional width/height
const photo = (seed, w = 800, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Filter tabs shown on the gallery page
export const galleryCategories = ["All", "Nails", "Lashes", "Skin & Spa", "Salon"];

// Before/after comparison sets for results showcase
export const beforeAfterSets = [
  // Nails before/after example
  {
    id: "ba-nails-1",
    title: "Gel Extension Makeover",
    category: "Nails",
    before: photo("celine-nail-before-1", 600, 700),
    after: photo("celine-nail-after-1", 600, 700),
  },
  // Lashes before/after example
  {
    id: "ba-lashes-1",
    title: "Volume Lash Extensions",
    category: "Lashes",
    before: photo("celine-lash-before-1", 600, 700),
    after: photo("celine-lash-after-1", 600, 700),
  },
  // Skin & spa before/after example
  {
    id: "ba-skin-1",
    title: "Radiance Facial Treatment",
    category: "Skin & Spa",
    before: photo("celine-skin-before-1", 600, 700),
    after: photo("celine-skin-after-1", 600, 700),
  },
  // Second nails before/after example
  {
    id: "ba-nails-2",
    title: "Babyboomer French Set",
    category: "Nails",
    before: photo("celine-nail-before-2", 600, 700),
    after: photo("celine-nail-after-2", 600, 700),
  },
];

// Masonry-style gallery grid items
export const galleryImages = [
  { id: "g1", category: "Salon", caption: "Our reception", src: photo("celine-salon-1", 800, 1000), tall: true },
  { id: "g2", category: "Nails", caption: "Fresh gel manicure", src: photo("celine-nails-1", 800, 800) },
  { id: "g3", category: "Lashes", caption: "Classic lash set", src: photo("celine-lashes-1", 800, 800) },
  { id: "g4", category: "Skin & Spa", caption: "Relaxing head spa", src: photo("celine-spa-1", 800, 1000), tall: true },
  { id: "g5", category: "Salon", caption: "Treatment lounge", src: photo("celine-salon-2", 800, 800) },
  { id: "g6", category: "Nails", caption: "Nail art detail", src: photo("celine-nails-2", 800, 800) },
  { id: "g7", category: "Skin & Spa", caption: "Glowing results", src: photo("celine-spa-2", 800, 800) },
  { id: "g8", category: "Lashes", caption: "Volume lashes close-up", src: photo("celine-lashes-2", 800, 1000), tall: true },
  { id: "g9", category: "Salon", caption: "Pedicure station", src: photo("celine-salon-3", 800, 800) },
  { id: "g10", category: "Nails", caption: "Seasonal colours", src: photo("celine-nails-3", 800, 800) },
  { id: "g11", category: "Skin & Spa", caption: "Calm & cosy", src: photo("celine-spa-3", 800, 800) },
  { id: "g12", category: "Lashes", caption: "Lash lift glow-up", src: photo("celine-lashes-3", 800, 1000), tall: true },
];
