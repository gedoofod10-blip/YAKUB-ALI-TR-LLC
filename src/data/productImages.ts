// One dedicated image per product — indexed by product position in translations.products.items
// (same order in both languages). Real stock photos (Pexels) + custom shots for items without stock matches.
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800`;

export const PRODUCT_IMAGES: string[] = [
  // ── Sanitary ──
  px(13963752), // Basin mixers & faucets – stainless faucet on ceramic sink
  px(8082333), // Wash basins & WC – bathroom with basin
  px(14334053), // Shower sets & rain showers – shower head close up
  "/images/products/water-heater.jpg", // Water heaters
  px(18071802), // Bathroom accessories – soap dispenser, towels
  px(28101094), // Angle valves & flexible hoses – braided flex pipes
  // ── Electrical ──
  px(28286038), // Cables & wires – copper wire
  px(36738243), // Switches & sockets
  px(28265032), // MCBs & distribution boards – electrical panel
  px(3946250), // LED lighting – LED bulbs
  "/images/products/conduit.jpg", // Conduits & trunking
  px(9257922), // Fans & exhausts – ceiling fan
  // ── Plumbing ──
  px(28169591), // PPR pipes & fittings – plumbing fittings in a row
  px(29301874), // UPVC / CPVC pipes – stacked PVC pipes
  px(3616761), // Valves & taps – metal taps with red handles
  "/images/products/floor-drain.jpg", // Drainage & traps
  px(6124242), // Sealants & tapes – applying sealant
  // ── Tools ──
  "/images/products/water-pump.jpg", // Water pumps
  px(5194769), // Hand tools – assorted tools
  px(30413428), // Power tools – cordless drills
  px(5279361), // Fasteners & anchors – bolts & screws
];
