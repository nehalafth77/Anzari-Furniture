// Ansari Furniture - High-end Modern Luxury E-commerce Admin Data System

export const FURNITURE_IMAGES = {
  novaSofa: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
  terraDining: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
  astraBed: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  lumaLounge: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
  milanoChair: "https://images.unsplash.com/photo-1580481077195-c328ad4f3e69?auto=format&fit=crop&w=1200&q=80",
  solaceArmchair: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
  zenithCredenza: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
  auroraLamp: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
  kansoCoffeeTable: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
  sereneOutdoorDaybed: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  arcDesk: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
  heritageConsole: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
  velvetPouf: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
};

export const INITIAL_PRODUCTS = [
  {
    id: "PROD-001",
    name: "Nova Fabric Sofa",
    category: "Living Room",
    collection: "The Living Edit",
    price: 64999,
    salePrice: 59999,
    costPrice: 32000,
    sku: "ANS-LIV-SOF-001",
    stock: 4,
    lowStockThreshold: 8,
    status: "Published",
    warehouse: "Mumbai Central Warehouse",
    image: FURNITURE_IMAGES.novaSofa,
    description: "Architectural monolithic sofa sculpted in tactile Belgian bouclé upholstery with internal solid kiln-dried oak reinforcement. Designed for serene, conversational open-plan spaces.",
    shortDescription: "Sculpted 3-seater sofa in warm cream bouclé.",
    unitsSold: 312,
    revenue: 20279688,
    rating: 4.9,
    reviewsCount: 48,
    variants: {
      sizes: ["3-Seater (220cm)", "4-Seater (260cm)", "L-Sectional"],
      colors: [
        { name: "Warm Cream Bouclé", hex: "#E8E2D6" },
        { name: "Oatmeal Linen", hex: "#D6CFC4" },
        { name: "Charcoal Chenille", hex: "#3A3835" }
      ],
      materials: ["Belgian Bouclé", "Kiln-Dried European Oak", "High-Resilience Foam"]
    },
    updatedAt: "Today at 03:15 PM"
  },
  {
    id: "PROD-002",
    name: "Terra Dining Table",
    category: "Dining",
    collection: "The Modern Woodcraft",
    price: 39999,
    salePrice: null,
    costPrice: 20000,
    sku: "ANS-DIN-TAB-002",
    stock: 3,
    lowStockThreshold: 6,
    status: "Published",
    warehouse: "Bengaluru Fulfillment Hub",
    image: FURNITURE_IMAGES.terraDining,
    description: "Solid fluted pedestal dining table crafted from sustainable plantation teakwood with rounded organic beveled edges and a matte hand-rubbed wax finish.",
    shortDescription: "Pedestal 6-seater dining table in natural oiled teak.",
    unitsSold: 184,
    revenue: 7359816,
    rating: 4.8,
    reviewsCount: 32,
    variants: {
      sizes: ["6-Seater (180cm)", "8-Seater (220cm)"],
      colors: [
        { name: "Natural Smoked Teak", hex: "#7E5C3D" },
        { name: "Bleached Ash", hex: "#E2D9CD" }
      ],
      materials: ["Solid Plantation Teak", "Cast Iron Core Base"]
    },
    updatedAt: "Yesterday at 11:20 AM"
  },
  {
    id: "PROD-003",
    name: "Astra Bed Frame",
    category: "Bedroom",
    collection: "Bedroom Essentials",
    price: 54999,
    salePrice: 49999,
    costPrice: 27500,
    sku: "ANS-BED-FRA-003",
    stock: 5,
    lowStockThreshold: 10,
    status: "Published",
    warehouse: "Delhi North Depot",
    image: FURNITURE_IMAGES.astraBed,
    description: "Floating platform bed frame enveloped in heavy-weight stone-washed raw linen with integrated cushioned headboard and concealed ambient LED perimeter channel.",
    shortDescription: "Platform bed with acoustic linen headboard.",
    unitsSold: 248,
    revenue: 13639752,
    rating: 5.0,
    reviewsCount: 64,
    variants: {
      sizes: ["Queen (60x78 in)", "King (72x78 in)"],
      colors: [
        { name: "Raw Desert Linen", hex: "#D4C7B8" },
        { name: "Espresso Wool", hex: "#2C2623" }
      ],
      materials: ["Stone-Washed Linen", "Solid Walnut Slat Base"]
    },
    updatedAt: "12 Sep 2026, 09:40 AM"
  },
  {
    id: "PROD-004",
    name: "Luma Lounge Chair",
    category: "Living Room",
    collection: "The Milano Collection",
    price: 24999,
    salePrice: null,
    costPrice: 12500,
    sku: "ANS-LIV-CHA-004",
    stock: 7,
    lowStockThreshold: 12,
    status: "Published",
    warehouse: "Mumbai Central Warehouse",
    image: FURNITURE_IMAGES.lumaLounge,
    description: "Sculptural continuous ribbon lounge chair engineered with curved molded plywood and upholstered in soft shearling-effect wool.",
    shortDescription: "Mid-century organic silhouette accent armchair.",
    unitsSold: 419,
    revenue: 10474581,
    rating: 4.7,
    reviewsCount: 53,
    variants: {
      sizes: ["Standard Ergonomic (85x82x78 cm)"],
      colors: [
        { name: "Ivory Shearling", hex: "#F3EDE2" },
        { name: "Burnt Ochre Velvet", hex: "#A85D36" },
        { name: "Sage Bouclé", hex: "#7E8576" }
      ],
      materials: ["Molded Walnut Plywood", "Shearling Wool"]
    },
    updatedAt: "10 Sep 2026, 04:30 PM"
  },
  {
    id: "PROD-005",
    name: "Milano Accent Chair",
    category: "Living Room",
    collection: "The Milano Collection",
    price: 29999,
    salePrice: 26999,
    costPrice: 15000,
    sku: "ANS-LIV-ACC-005",
    stock: 14,
    lowStockThreshold: 8,
    status: "Published",
    warehouse: "Bengaluru Fulfillment Hub",
    image: FURNITURE_IMAGES.milanoChair,
    description: "Italian modernism-inspired low sling chair with brushed champagne brass framing and cognac saddle leather strapping hand-stitched by master artisans.",
    shortDescription: "Hand-stitched cognac leather with brass frame.",
    unitsSold: 198,
    revenue: 5939802,
    rating: 4.9,
    reviewsCount: 29,
    variants: {
      sizes: ["Standard Lounge"],
      colors: [
        { name: "Cognac Saddle Leather", hex: "#8A4F2A" },
        { name: "Black Onyx Leather", hex: "#1C1B1A" }
      ],
      materials: ["Full Grain Italian Leather", "Brushed Champagne Brass"]
    },
    updatedAt: "08 Sep 2026, 01:15 PM"
  },
  {
    id: "PROD-006",
    name: "Zenith Minimal Credenza",
    category: "Dining",
    collection: "The Modern Woodcraft",
    price: 48999,
    salePrice: null,
    costPrice: 24000,
    sku: "ANS-DIN-CRE-006",
    stock: 9,
    lowStockThreshold: 5,
    status: "Published",
    warehouse: "Delhi North Depot",
    image: FURNITURE_IMAGES.zenithCredenza,
    description: "Four-door buffet sideboard with slatted Japanese tambour doors and honed Travertine stone top insert. Concealed soft-close cable management compartments.",
    shortDescription: "Tambour slatted credenza with Travertine stone top.",
    unitsSold: 94,
    revenue: 4605906,
    rating: 4.8,
    reviewsCount: 16,
    variants: {
      sizes: ["200cm Sideboard"],
      colors: [
        { name: "Smoked American Walnut", hex: "#4A392C" },
        { name: "Bleached Scandinavian Ash", hex: "#DFD7CB" }
      ],
      materials: ["Solid Walnut", "Honed Italian Travertine"]
    },
    updatedAt: "05 Sep 2026, 06:12 PM"
  },
  {
    id: "PROD-007",
    name: "Aurora Alabaster Pendant",
    category: "Accessories",
    collection: "The Living Edit",
    price: 14999,
    salePrice: null,
    costPrice: 6500,
    sku: "ANS-ACC-LGT-007",
    stock: 22,
    lowStockThreshold: 10,
    status: "Published",
    warehouse: "Mumbai Central Warehouse",
    image: FURNITURE_IMAGES.auroraLamp,
    description: "Sculpted natural Spanish alabaster stone disc suspended by woven silk cable and aged brass ceiling canopy. Emits a warm amber diffused radiance.",
    shortDescription: "Carved natural alabaster stone luminaire.",
    unitsSold: 320,
    revenue: 4799680,
    rating: 4.9,
    reviewsCount: 42,
    variants: {
      sizes: ["30cm Dia", "45cm Dia"],
      colors: [{ name: "Translucent Warm Alabaster", hex: "#F3EDE5" }],
      materials: ["Natural Alabaster Stone", "Aged Brass Fittings"]
    },
    updatedAt: "02 Sep 2026, 10:00 AM"
  },
  {
    id: "PROD-008",
    name: "Arc Executive Writing Desk",
    category: "Home Office",
    collection: "The Modern Woodcraft",
    price: 52999,
    salePrice: 47999,
    costPrice: 26000,
    sku: "ANS-OFF-DSK-008",
    stock: 6,
    lowStockThreshold: 5,
    status: "Published",
    warehouse: "Bengaluru Fulfillment Hub",
    image: FURNITURE_IMAGES.arcDesk,
    description: "Architectural cantilevered home office workstation featuring bullnose radius edge, recessed wireless inductive charging pad, and dual soft-felt drawers.",
    shortDescription: "Executive cantilever desk in walnut & leather.",
    unitsSold: 88,
    revenue: 4663912,
    rating: 4.8,
    reviewsCount: 19,
    variants: {
      sizes: ["160x75 cm", "180x80 cm"],
      colors: [
        { name: "Rich Walnut / Espresso Leather", hex: "#423227" },
        { name: "Natural White Oak / Sand Leather", hex: "#C7BEB3" }
      ],
      materials: ["Solid Walnut Timber", "Italian Saddle Leather Inlay"]
    },
    updatedAt: "31 Aug 2026, 05:20 PM"
  },
  {
    id: "PROD-009",
    name: "Kanso Travertine Coffee Table",
    category: "Living Room",
    collection: "The Milano Collection",
    price: 34999,
    salePrice: null,
    costPrice: 17000,
    sku: "ANS-LIV-COF-009",
    stock: 11,
    lowStockThreshold: 8,
    status: "Published",
    warehouse: "Mumbai Central Warehouse",
    image: FURNITURE_IMAGES.kansoCoffeeTable,
    description: "Monolithic two-tier low coffee table crafted from unfilled Roman travertine with natural porous geological veins and sealed matte protective coating.",
    shortDescription: "Two-tier honed Roman travertine coffee table.",
    unitsSold: 145,
    revenue: 5074855,
    rating: 5.0,
    reviewsCount: 31,
    variants: {
      sizes: ["120x70x35 cm"],
      colors: [{ name: "Roman Warm Ivory Travertine", hex: "#E9E2D5" }],
      materials: ["Natural Unfilled Roman Travertine"]
    },
    updatedAt: "28 Aug 2026, 12:45 PM"
  },
  {
    id: "PROD-010",
    name: "Serene Teak Outdoor Daybed",
    category: "Outdoor",
    collection: "Outdoor Living",
    price: 68999,
    salePrice: 62999,
    costPrice: 34000,
    sku: "ANS-OUT-DAY-010",
    stock: 8,
    lowStockThreshold: 6,
    status: "Published",
    warehouse: "Bengaluru Fulfillment Hub",
    image: FURNITURE_IMAGES.sereneOutdoorDaybed,
    description: "Grade-A marine-finish plantation teak lounger with quick-dry reticulated foam cushions upholstered in weather-resistant Sunbrella canvas fabric.",
    shortDescription: "Marine teak double lounger with Sunbrella fabric.",
    unitsSold: 76,
    revenue: 5243924,
    rating: 4.8,
    reviewsCount: 14,
    variants: {
      sizes: ["Double Daybed (200x150 cm)"],
      colors: [
        { name: "Sunbrella Sand Linen", hex: "#E5DEC9" },
        { name: "Sunbrella Olive Taupe", hex: "#7B7564" }
      ],
      materials: ["Grade-A Teak", "Sunbrella Performance Textile"]
    },
    updatedAt: "25 Aug 2026, 03:00 PM"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "#AN-10482",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.sharma@moderncraft.in",
      phone: "+91 98201 44821",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      totalOrders: 4,
      lifetimeValue: 184500
    },
    shippingAddress: {
      line1: "Flat 1402, The Belvedere Crest, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400018",
      country: "India"
    },
    billingAddress: {
      line1: "Flat 1402, The Belvedere Crest, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400018",
      country: "India"
    },
    items: [
      {
        productId: "PROD-003",
        name: "Astra Bed Frame",
        variant: "King (72x78 in) / Raw Desert Linen",
        price: 54999,
        quantity: 1,
        image: FURNITURE_IMAGES.astraBed
      },
      {
        productId: "PROD-007",
        name: "Aurora Alabaster Pendant",
        variant: "30cm Dia / Warm Alabaster",
        price: 14999,
        quantity: 2,
        image: FURNITURE_IMAGES.auroraLamp
      }
    ],
    date: "12 Sep 2026, 18:42",
    subtotal: 84997,
    discount: 8499, // 10% coupon
    couponCode: "WELCOME10",
    shipping: 0, // Free White Glove Delivery
    tax: 13769, // 18% GST
    total: 90267,
    paymentMethod: "Razorpay (HDFC NetBanking)",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    deliveryMethod: "White Glove Luxury Delivery & Assembly",
    notes: "Customer requested evening delivery after 6 PM. Call 30 mins prior to arrival.",
    timeline: [
      { status: "Order Placed", date: "12 Sep 2026, 18:42", completed: true, note: "Order placed online via website" },
      { status: "Payment Confirmed", date: "12 Sep 2026, 18:43", completed: true, note: "HDFC Payment Gateway TXN_884920412" },
      { status: "Processing", date: "12 Sep 2026, 19:15", completed: true, note: "Order routed to Mumbai Central Warehouse" },
      { status: "Packed", date: "Pending", completed: false, note: "Protective wooden crate packaging" },
      { status: "Shipped", date: "Pending", completed: false, note: "Ansari Dedicated Fleet Dispatch" },
      { status: "Out for Delivery", date: "Pending", completed: false, note: "Local delivery team assignment" },
      { status: "Delivered", date: "Pending", completed: false, note: "Customer sign-off & unboxing" }
    ]
  },
  {
    id: "#AN-10481",
    customer: {
      name: "Priyanka Roy",
      email: "priyanka.roy@designstudio.co",
      phone: "+91 97118 90212",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      totalOrders: 6,
      lifetimeValue: 312000
    },
    shippingAddress: {
      line1: "Villa 8, Epsilon Residences, Yemalur",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560037",
      country: "India"
    },
    billingAddress: {
      line1: "Villa 8, Epsilon Residences, Yemalur",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560037",
      country: "India"
    },
    items: [
      {
        productId: "PROD-001",
        name: "Nova Fabric Sofa",
        variant: "3-Seater / Warm Cream Bouclé",
        price: 59999,
        quantity: 1,
        image: FURNITURE_IMAGES.novaSofa
      },
      {
        productId: "PROD-009",
        name: "Kanso Travertine Coffee Table",
        variant: "120x70 cm / Travertine",
        price: 34999,
        quantity: 1,
        image: FURNITURE_IMAGES.kansoCoffeeTable
      }
    ],
    date: "12 Sep 2026, 15:10",
    subtotal: 94998,
    discount: 5000,
    couponCode: "FESTIVE15",
    shipping: 0,
    tax: 16199,
    total: 106197,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    deliveryMethod: "White Glove Luxury Delivery",
    notes: "Service elevator available on premise.",
    timeline: [
      { status: "Order Placed", date: "12 Sep 2026, 15:10", completed: true, note: "Order placed online" },
      { status: "Payment Confirmed", date: "12 Sep 2026, 15:11", completed: true, note: "UPI verification successful" },
      { status: "Processing", date: "Pending", completed: false, note: "Allocation in Bengaluru Fulfillment Hub" },
      { status: "Packed", date: "Pending", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  {
    id: "#AN-10480",
    customer: {
      name: "Vikramaditya Singhania",
      email: "vikram.singhania@apexcapital.in",
      phone: "+91 99100 33819",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      totalOrders: 3,
      lifetimeValue: 245000
    },
    shippingAddress: {
      line1: "Plot 42, Friends Colony West",
      city: "New Delhi",
      state: "Delhi NCR",
      postalCode: "110065",
      country: "India"
    },
    billingAddress: {
      line1: "Plot 42, Friends Colony West",
      city: "New Delhi",
      state: "Delhi NCR",
      postalCode: "110065",
      country: "India"
    },
    items: [
      {
        productId: "PROD-002",
        name: "Terra Dining Table",
        variant: "8-Seater (220cm) / Smoked Teak",
        price: 39999,
        quantity: 1,
        image: FURNITURE_IMAGES.terraDining
      },
      {
        productId: "PROD-005",
        name: "Milano Accent Chair",
        variant: "Cognac Saddle Leather",
        price: 26999,
        quantity: 2,
        image: FURNITURE_IMAGES.milanoChair
      }
    ],
    date: "11 Sep 2026, 21:05",
    subtotal: 93997,
    discount: 0,
    couponCode: null,
    shipping: 0,
    tax: 16919,
    total: 110916,
    paymentMethod: "Credit Card (Amex Platinum)",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    deliveryMethod: "Ansari Express Freight",
    notes: "Insured transit crate dispatch.",
    timeline: [
      { status: "Order Placed", date: "11 Sep 2026, 21:05", completed: true },
      { status: "Payment Confirmed", date: "11 Sep 2026, 21:06", completed: true },
      { status: "Processing", date: "12 Sep 2026, 09:30", completed: true },
      { status: "Packed", date: "12 Sep 2026, 14:00", completed: true },
      { status: "Shipped", date: "12 Sep 2026, 17:30", completed: true, note: "Tracking: AWB-DEL-9910480" },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  {
    id: "#AN-10479",
    customer: {
      name: "Ananya Deshmukh",
      email: "ananya.d@studioatelier.org",
      phone: "+91 98450 71822",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      totalOrders: 2,
      lifetimeValue: 89000
    },
    shippingAddress: {
      line1: "Apt 501, Koregaon Park North Main Rd",
      city: "Pune",
      state: "Maharashtra",
      postalCode: "411001",
      country: "India"
    },
    billingAddress: {
      line1: "Apt 501, Koregaon Park North Main Rd",
      city: "Pune",
      state: "Maharashtra",
      postalCode: "411001",
      country: "India"
    },
    items: [
      {
        productId: "PROD-004",
        name: "Luma Lounge Chair",
        variant: "Ivory Shearling",
        price: 24999,
        quantity: 2,
        image: FURNITURE_IMAGES.lumaLounge
      }
    ],
    date: "11 Sep 2026, 14:22",
    subtotal: 49998,
    discount: 500,
    couponCode: "HOME500",
    shipping: 0,
    tax: 8909,
    total: 58407,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryMethod: "White Glove Luxury Delivery",
    notes: "Customer signed handover receipt. Rated 5 stars.",
    timeline: [
      { status: "Order Placed", date: "11 Sep 2026, 14:22", completed: true },
      { status: "Payment Confirmed", date: "11 Sep 2026, 14:23", completed: true },
      { status: "Processing", date: "11 Sep 2026, 15:00", completed: true },
      { status: "Packed", date: "11 Sep 2026, 18:30", completed: true },
      { status: "Shipped", date: "12 Sep 2026, 08:00", completed: true },
      { status: "Out for Delivery", date: "12 Sep 2026, 11:30", completed: true },
      { status: "Delivered", date: "12 Sep 2026, 13:45", completed: true, note: "Signed by Ananya Deshmukh" }
    ]
  },
  {
    id: "#AN-10478",
    customer: {
      name: "Karan Johar Mehta",
      email: "karan.mehta@zenithliving.in",
      phone: "+91 98112 55904",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      totalOrders: 1,
      lifetimeValue: 52999
    },
    shippingAddress: {
      line1: "House 104, Jubilee Hills Road 36",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500033",
      country: "India"
    },
    billingAddress: {
      line1: "House 104, Jubilee Hills Road 36",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500033",
      country: "India"
    },
    items: [
      {
        productId: "PROD-008",
        name: "Arc Executive Writing Desk",
        variant: "180x80 cm / Rich Walnut",
        price: 47999,
        quantity: 1,
        image: FURNITURE_IMAGES.arcDesk
      }
    ],
    date: "10 Sep 2026, 19:18",
    subtotal: 47999,
    discount: 0,
    couponCode: null,
    shipping: 1200,
    tax: 8855,
    total: 58054,
    paymentMethod: "NetBanking (ICICI)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    deliveryMethod: "Ansari Express Logistics",
    notes: "Assembly completed in executive study room.",
    timeline: [
      { status: "Order Placed", date: "10 Sep 2026, 19:18", completed: true },
      { status: "Payment Confirmed", date: "10 Sep 2026, 19:20", completed: true },
      { status: "Processing", date: "11 Sep 2026, 09:00", completed: true },
      { status: "Packed", date: "11 Sep 2026, 14:00", completed: true },
      { status: "Shipped", date: "11 Sep 2026, 17:00", completed: true },
      { status: "Out for Delivery", date: "12 Sep 2026, 10:00", completed: true },
      { status: "Delivered", date: "12 Sep 2026, 14:15", completed: true }
    ]
  },
  {
    id: "#AN-10477",
    customer: {
      name: "Sneha Kapur",
      email: "sneha.k@voguearchitects.com",
      phone: "+91 98210 11993",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      totalOrders: 5,
      lifetimeValue: 278000
    },
    shippingAddress: {
      line1: "Flat 9B, Silver Arch Apartments, Nungambakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600034",
      country: "India"
    },
    billingAddress: {
      line1: "Flat 9B, Silver Arch Apartments, Nungambakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600034",
      country: "India"
    },
    items: [
      {
        productId: "PROD-006",
        name: "Zenith Minimal Credenza",
        variant: "200cm / Smoked American Walnut",
        price: 48999,
        quantity: 1,
        image: FURNITURE_IMAGES.zenithCredenza
      }
    ],
    date: "10 Sep 2026, 11:05",
    subtotal: 48999,
    discount: 4899,
    couponCode: "WELCOME10",
    shipping: 0,
    tax: 7938,
    total: 52038,
    paymentMethod: "Razorpay (Credit Card)",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    deliveryMethod: "White Glove Luxury Delivery",
    notes: "Requires protective wrapping for antique parquet flooring.",
    timeline: [
      { status: "Order Placed", date: "10 Sep 2026, 11:05", completed: true },
      { status: "Payment Confirmed", date: "10 Sep 2026, 11:06", completed: true },
      { status: "Processing", date: "10 Sep 2026, 14:00", completed: true },
      { status: "Packed", date: "Pending", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  {
    id: "#AN-10476",
    customer: {
      name: "Arjun Nambiar",
      email: "arjun.n@cochinestates.in",
      phone: "+91 94471 28910",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      totalOrders: 2,
      lifetimeValue: 74998
    },
    shippingAddress: {
      line1: "Waterfront Villa 14, Panampilly Nagar",
      city: "Kochi",
      state: "Kerala",
      postalCode: "682036",
      country: "India"
    },
    billingAddress: {
      line1: "Waterfront Villa 14, Panampilly Nagar",
      city: "Kochi",
      state: "Kerala",
      postalCode: "682036",
      country: "India"
    },
    items: [
      {
        productId: "PROD-010",
        name: "Serene Teak Outdoor Daybed",
        variant: "Sunbrella Sand Linen",
        price: 62999,
        quantity: 1,
        image: FURNITURE_IMAGES.sereneOutdoorDaybed
      }
    ],
    date: "09 Sep 2026, 16:40",
    subtotal: 62999,
    discount: 0,
    couponCode: null,
    shipping: 1500,
    tax: 11609,
    total: 76108,
    paymentMethod: "Credit Card (HDFC Diners)",
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    deliveryMethod: "Anzari Coastal Transport",
    notes: "Delivery via water-front access road.",
    timeline: [
      { status: "Order Placed", date: "09 Sep 2026, 16:40", completed: true },
      { status: "Payment Confirmed", date: "09 Sep 2026, 16:41", completed: true },
      { status: "Processing", date: "Pending", completed: false },
      { status: "Packed", date: "Pending", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Out for Delivery", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  {
    id: "#AN-10475",
    customer: {
      name: "Tanya Chawla",
      email: "tanya.chawla@delhicouture.com",
      phone: "+91 98101 77321",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80",
      totalOrders: 1,
      lifetimeValue: 34999
    },
    shippingAddress: {
      line1: "B-4/18, Vasant Vihar",
      city: "New Delhi",
      state: "Delhi NCR",
      postalCode: "110057",
      country: "India"
    },
    billingAddress: {
      line1: "B-4/18, Vasant Vihar",
      city: "New Delhi",
      state: "Delhi NCR",
      postalCode: "110057",
      country: "India"
    },
    items: [
      {
        productId: "PROD-009",
        name: "Kanso Travertine Coffee Table",
        variant: "120x70 cm / Travertine",
        price: 34999,
        quantity: 1,
        image: FURNITURE_IMAGES.kansoCoffeeTable
      }
    ],
    date: "08 Sep 2026, 13:12",
    subtotal: 34999,
    discount: 0,
    couponCode: null,
    shipping: 0,
    tax: 6299,
    total: 41298,
    paymentMethod: "Cancelled (Timeout)",
    paymentStatus: "Refunded",
    orderStatus: "Cancelled",
    deliveryMethod: "Standard Freight",
    notes: "Order cancelled by client before dispatch.",
    timeline: [
      { status: "Order Placed", date: "08 Sep 2026, 13:12", completed: true },
      { status: "Payment Confirmed", date: "08 Sep 2026, 13:13", completed: true },
      { status: "Cancelled", date: "08 Sep 2026, 14:00", completed: true, note: "Client request for change of mind" },
      { status: "Refund Processed", date: "08 Sep 2026, 14:30", completed: true, note: "Full refund reversed to source" }
    ]
  }
];

export const INITIAL_COLLECTIONS = [
  {
    id: "COL-001",
    name: "The Milano Collection",
    tagline: "Italian Modernism & Raw Elegance",
    description: "Sculptural forms crafted with cognac saddle leathers, brushed champagne brass accents, and Roman travertine stones.",
    productsCount: 18,
    status: "Published",
    featured: true,
    image: FURNITURE_IMAGES.milanoChair,
    lastUpdated: "12 Sep 2026"
  },
  {
    id: "COL-002",
    name: "The Modern Woodcraft",
    tagline: "Hand-Crafted Sustainable Hardwoods",
    description: "Pure architectural joinery utilizing solid plantation teak, smoked American walnut, and Japanese slatted tambour details.",
    productsCount: 24,
    status: "Published",
    featured: true,
    image: FURNITURE_IMAGES.terraDining,
    lastUpdated: "11 Sep 2026"
  },
  {
    id: "COL-003",
    name: "The Living Edit",
    tagline: "Serene Monolithic Forms for Gatherings",
    description: "Tactile Belgian bouclés, cloud-like modular seatings, and luminous alabaster pendants for refined sanctuary spaces.",
    productsCount: 32,
    status: "Published",
    featured: true,
    image: FURNITURE_IMAGES.novaSofa,
    lastUpdated: "10 Sep 2026"
  },
  {
    id: "COL-004",
    name: "Bedroom Essentials",
    tagline: "Quiet Sanctuaries & Organic Linens",
    description: "Low platform silhouettes, floating acoustic headboards, and raw stonewashed linen weaves tailored for deep tranquility.",
    productsCount: 16,
    status: "Published",
    featured: false,
    image: FURNITURE_IMAGES.astraBed,
    lastUpdated: "08 Sep 2026"
  },
  {
    id: "COL-005",
    name: "Outdoor Living",
    tagline: "Year-Round Coastal Teak & Stone",
    description: "Marine-grade teakwood loungers, weather-defying Sunbrella performance textiles, and textured outdoor fire vessels.",
    productsCount: 12,
    status: "Published",
    featured: false,
    image: FURNITURE_IMAGES.sereneOutdoorDaybed,
    lastUpdated: "05 Sep 2026"
  }
];

export const INITIAL_CATEGORIES = [
  { name: "Living Room", count: 42, revenueShare: "38%", icon: "Sofa" },
  { name: "Bedroom", count: 28, revenueShare: "26%", icon: "Bed" },
  { name: "Dining", count: 22, revenueShare: "18%", icon: "Utensils" },
  { name: "Home Office", count: 14, revenueShare: "9%", icon: "Briefcase" },
  { name: "Outdoor", count: 12, revenueShare: "6%", icon: "Sun" },
  { name: "Accessories", count: 35, revenueShare: "3%", icon: "Lamp" }
];

export const INITIAL_CUSTOMERS = [
  {
    id: "CUST-101",
    name: "Rahul Sharma",
    email: "rahul.sharma@moderncraft.in",
    phone: "+91 98201 44821",
    location: "Worli, Mumbai",
    ordersCount: 4,
    totalSpent: 184500,
    lastOrder: "12 Sep 2026",
    status: "VIP Patron",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "CUST-102",
    name: "Priyanka Roy",
    email: "priyanka.roy@designstudio.co",
    phone: "+91 97118 90212",
    location: "Yemalur, Bengaluru",
    ordersCount: 6,
    totalSpent: 312000,
    lastOrder: "12 Sep 2026",
    status: "Architect / Trade",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "CUST-103",
    name: "Vikramaditya Singhania",
    email: "vikram.singhania@apexcapital.in",
    phone: "+91 99100 33819",
    location: "Friends Colony, New Delhi",
    ordersCount: 3,
    totalSpent: 245000,
    lastOrder: "11 Sep 2026",
    status: "VIP Patron",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "CUST-104",
    name: "Ananya Deshmukh",
    email: "ananya.d@studioatelier.org",
    phone: "+91 98450 71822",
    location: "Koregaon Park, Pune",
    ordersCount: 2,
    totalSpent: 89000,
    lastOrder: "11 Sep 2026",
    status: "Active Patron",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "CUST-105",
    name: "Karan Johar Mehta",
    email: "karan.mehta@zenithliving.in",
    phone: "+91 98112 55904",
    location: "Jubilee Hills, Hyderabad",
    ordersCount: 1,
    totalSpent: 52999,
    lastOrder: "10 Sep 2026",
    status: "Active Patron",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "CUST-106",
    name: "Sneha Kapur",
    email: "sneha.k@voguearchitects.com",
    phone: "+91 98210 11993",
    location: "Nungambakkam, Chennai",
    ordersCount: 5,
    totalSpent: 278000,
    lastOrder: "10 Sep 2026",
    status: "Architect / Trade",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "REV-401",
    customer: "Rahul Sharma",
    product: "Astra Bed Frame",
    rating: 5,
    date: "12 Sep 2026",
    status: "Published",
    verified: true,
    content: "The raw linen upholstery is phenomenal. It has transformed the master bedroom into a 5-star Japanese-Scandinavian retreat. Delivery crew in Mumbai was remarkably courteous.",
    reply: "Dear Rahul, thank you for your kind words! We are thrilled to hear that the Astra Bed Frame elevates your sanctuary."
  },
  {
    id: "REV-402",
    customer: "Priyanka Roy",
    product: "Nova Fabric Sofa",
    rating: 5,
    date: "11 Sep 2026",
    status: "Published",
    verified: true,
    content: "As an interior designer, I am extremely particular about bouclé density. Ansari Furniture's fabric choice is among the finest I've seen in India. Zero sag and exquisite silhouette.",
    reply: null
  },
  {
    id: "REV-403",
    customer: "Ananya Deshmukh",
    product: "Luma Lounge Chair",
    rating: 5,
    date: "10 Sep 2026",
    status: "Published",
    verified: true,
    content: "The shearling wool is extraordinarily soft and the walnut wood curve is pure sculpture. It is the focal piece of my reading nook.",
    reply: null
  },
  {
    id: "REV-404",
    customer: "Devendra Verma",
    product: "Terra Dining Table",
    rating: 4,
    date: "09 Sep 2026",
    status: "Pending",
    verified: true,
    content: "Stunning teak craftsmanship. Natural oils have a wonderful aroma. Minor delay of 1 day on transit dispatch, but the customer desk kept me well informed.",
    reply: null
  },
  {
    id: "REV-405",
    customer: "Shalini Poddar",
    product: "Zenith Minimal Credenza",
    rating: 5,
    date: "07 Sep 2026",
    status: "Published",
    verified: true,
    content: "The travertine stone slab on top is breathtaking. You can feel the real geological texture. Truly heirloom-grade furniture.",
    reply: "Dear Shalini, we are honoured to craft heirloom pieces for your home."
  }
];

export const INITIAL_COUPONS = [
  {
    id: "CPN-01",
    code: "WELCOME10",
    discountType: "Percentage",
    discountValue: 10,
    minOrder: 30000,
    maxDiscount: 10000,
    usageLimit: 1000,
    usedCount: 342,
    startDate: "01 Sep 2026",
    endDate: "31 Dec 2026",
    status: "Active"
  },
  {
    id: "CPN-02",
    code: "HOME500",
    discountType: "Fixed Amount",
    discountValue: 500,
    minOrder: 15000,
    maxDiscount: 500,
    usageLimit: 5000,
    usedCount: 1820,
    startDate: "01 Aug 2026",
    endDate: "30 Nov 2026",
    status: "Active"
  },
  {
    id: "CPN-03",
    code: "FESTIVE15",
    discountType: "Percentage",
    discountValue: 15,
    minOrder: 50000,
    maxDiscount: 15000,
    usageLimit: 500,
    usedCount: 289,
    startDate: "01 Sep 2026",
    endDate: "31 Oct 2026",
    status: "Active"
  },
  {
    id: "CPN-04",
    code: "ARCHITECT20",
    discountType: "Percentage",
    discountValue: 20,
    minOrder: 100000,
    maxDiscount: 50000,
    usageLimit: 200,
    usedCount: 84,
    startDate: "01 Jan 2026",
    endDate: "31 Dec 2026",
    status: "Active"
  }
];

export const HOMEPAGE_CMS_SECTIONS = [
  {
    id: "sec-hero",
    name: "Hero Slider",
    type: "hero_slider",
    enabled: true,
    order: 1,
    slides: [
      {
        id: "slide-1",
        heading: "Quiet Luxury for Modern Sanctuaries",
        subheading: "The Autumn 2026 Collection",
        description: "Handcrafted monolithic silhouettes rendered in tactile Belgian bouclés, solid plantation teak, and honed Italian travertine.",
        ctaText: "Explore The Living Edit",
        ctaLink: "/collections/the-living-edit",
        image: FURNITURE_IMAGES.novaSofa,
        active: true
      },
      {
        id: "slide-2",
        heading: "Architectural Woodcraft & Purity",
        subheading: "Master Joinery Series",
        description: "Pedestal tables and fluted credenzas built from sustainably harvested certified hardwoods.",
        ctaText: "Discover Dining",
        ctaLink: "/collections/the-modern-woodcraft",
        image: FURNITURE_IMAGES.terraDining,
        active: true
      },
      {
        id: "slide-3",
        heading: "The Milano Collection",
        subheading: "Italian Modernism Reimagined",
        description: "Brushed champagne brass, cognac saddle leather, and organic low-profile silhouettes.",
        ctaText: "View Milano Edition",
        ctaLink: "/collections/the-milano-collection",
        image: FURNITURE_IMAGES.milanoChair,
        active: true
      }
    ]
  },
  {
    id: "sec-featured-collection",
    name: "Featured Collection",
    type: "featured_collection",
    enabled: true,
    order: 2,
    collectionId: "COL-001",
    headline: "The Milano Collection: Italian Modernism Meets Natural Texture"
  },
  {
    id: "sec-shop-by-room",
    name: "Shop by Room",
    type: "room_grid",
    enabled: true,
    order: 3,
    rooms: ["Living Room", "Dining Room", "Bedroom", "Home Office", "Outdoor"]
  },
  {
    id: "sec-bestsellers",
    name: "Bestsellers",
    type: "bestsellers",
    enabled: true,
    order: 4,
    headline: "Curated Icons Loved by Patrons & Architects"
  },
  {
    id: "sec-brand-story",
    name: "Brand Story",
    type: "editorial_narrative",
    enabled: true,
    order: 5,
    title: "The Art of Slow Living & Craftsmanship",
    excerpt: "Founded in 1984, Ansari Furniture unites generations of Indian artisanal wood joinery with European modernist minimalism."
  },
  {
    id: "sec-testimonials",
    name: "Customer Testimonials",
    type: "testimonials",
    enabled: true,
    order: 6
  },
  {
    id: "sec-journal",
    name: "Inspiration / Journal",
    type: "journal_feed",
    enabled: true,
    order: 7
  },
  {
    id: "sec-newsletter",
    name: "Newsletter",
    type: "newsletter",
    enabled: true,
    order: 8
  },
  {
    id: "sec-footer",
    name: "Footer",
    type: "footer",
    enabled: true,
    order: 9
  }
];

export const JOURNAL_ARTICLES = [
  {
    id: "ART-101",
    title: "The Return to Tactility: Belgian Bouclé and Raw Mineral Textures",
    category: "Interior Design Guides",
    author: "Zoya Ansari",
    authorRole: "Head of Design",
    readTime: "5 min read",
    coverImage: FURNITURE_IMAGES.novaSofa,
    publishDate: "08 Sep 2026",
    status: "Published",
    seoTitle: "Modern Bouclé & Mineral Textures Guide | Ansari Furniture Journal",
    metaDescription: "Explore how organic woven bouclé and natural travertine elevate luxury interior environments with warmth and tranquility.",
    content: "In contemporary architectural interiors, tactile materiality has taken precedence over superficial ornamentation. The tactile richness of heavy Belgian bouclé combined with cold, porous honed travertine creates a poetic dialogue between warmth and monolithic presence..."
  },
  {
    id: "ART-102",
    title: "Mastering the Art of the Quiet Sanctuary: Bedroom Architecture",
    category: "Room Inspiration",
    author: "Kareem Ansari",
    authorRole: "Principal Architect",
    readTime: "7 min read",
    coverImage: FURNITURE_IMAGES.astraBed,
    publishDate: "02 Sep 2026",
    status: "Published",
    seoTitle: "Bedroom Architecture & Sanctuary Design | Ansari Furniture",
    metaDescription: "Designing peaceful, clutter-free bedrooms with floating platform beds and acoustic linen headboards.",
    content: "Sleep architecture begins with spatial proportions. A low bed frame creates the illusion of higher ceilings and expansive breathing room, while acoustic headboards soften reflective sound echoes..."
  },
  {
    id: "ART-103",
    title: "Teakwood & Joinery: Why Slow Cured Hardwoods Last Generations",
    category: "Furniture Stories",
    author: "Devraj Mistry",
    authorRole: "Master Artisan",
    readTime: "6 min read",
    coverImage: FURNITURE_IMAGES.terraDining,
    publishDate: "28 Aug 2026",
    status: "Published",
    seoTitle: "Sustainable Teakwood Joinery Guide | Ansari Furniture",
    metaDescription: "Understanding kiln-drying, hand-rubbed wax finishes, and mortise-and-tenon craftsmanship in luxury furniture.",
    content: "Kiln-curing solid timber over three weeks reduces internal tension, preventing seasonal warps in humid coastal climates. Here is how our woodcraft studio guarantees structural stability for decades..."
  }
];

export const REVENUE_TIMELINE = [
  { date: "01 Sep", revenue: 540000, orders: 82, aov: 65850 },
  { date: "03 Sep", revenue: 620000, orders: 94, aov: 65957 },
  { date: "05 Sep", revenue: 590000, orders: 88, aov: 67045 },
  { date: "07 Sep", revenue: 710000, orders: 104, aov: 68269 },
  { date: "09 Sep", revenue: 680000, orders: 98, aov: 69387 },
  { date: "11 Sep", revenue: 790000, orders: 118, aov: 66949 },
  { date: "12 Sep", revenue: 842500, orders: 128, aov: 65820 }
];

export const CITY_SALES = [
  { city: "Mumbai", value: 3200000, percentage: 38 },
  { city: "Bengaluru", value: 2150000, percentage: 25 },
  { city: "Delhi NCR", value: 1850000, percentage: 22 },
  { city: "Hyderabad", value: 680000, percentage: 8 },
  { city: "Pune", value: 380000, percentage: 5 },
  { city: "Other Metros", value: 165000, percentage: 2 }
];

export const STAFF_MEMBERS = [
  {
    id: "STF-01",
    name: "Zoya Ansari",
    email: "zoya@ansarifurniture.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Now",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "STF-02",
    name: "Kareem Ansari",
    email: "kareem@ansarifurniture.com",
    role: "Manager",
    status: "Active",
    lastActive: "15 mins ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "STF-03",
    name: "Ishaan Sen",
    email: "ishaan.sen@ansarifurniture.com",
    role: "Product Manager",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "STF-04",
    name: "Meera Nair",
    email: "meera.nair@ansarifurniture.com",
    role: "Order Manager",
    status: "Active",
    lastActive: "4 mins ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "STF-05",
    name: "Aadit Chopra",
    email: "aadit@ansarifurniture.com",
    role: "Content Manager",
    status: "Active",
    lastActive: "Yesterday",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "STF-06",
    name: "Kavya Menon",
    email: "kavya@ansarifurniture.com",
    role: "Support Staff",
    status: "Offline",
    lastActive: "3 hours ago",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const NOTIFICATIONS_DATA = [
  {
    id: "notif-1",
    title: "New High-Value Order",
    description: "Rahul Sharma placed order #AN-10482 for ₹90,267 (Astra Bed Frame).",
    time: "4 mins ago",
    type: "order",
    unread: true
  },
  {
    id: "notif-2",
    title: "Low Stock Alert: Nova Fabric Sofa",
    description: "Only 4 units remaining in Mumbai Central Warehouse.",
    time: "25 mins ago",
    type: "inventory",
    unread: true
  },
  {
    id: "notif-3",
    title: "Payment Received via UPI",
    description: "₹1,06,197 successfully settled for order #AN-10481.",
    time: "1 hour ago",
    type: "payment",
    unread: true
  },
  {
    id: "notif-4",
    title: "New 5-Star Review",
    description: "Priyanka Roy reviewed 'Nova Fabric Sofa': 'Among the finest bouclé...'",
    time: "2 hours ago",
    type: "review",
    unread: false
  },
  {
    id: "notif-5",
    title: "VIP Patron Registered",
    description: "Architect Sneha Kapur created a trade account.",
    time: "5 hours ago",
    type: "customer",
    unread: false
  }
];

export const STORE_SETTINGS_DATA = {
  general: {
    storeName: "Ansari Furniture",
    tagline: "Quiet Luxury Modern Furniture",
    supportEmail: "concierge@ansarifurniture.com",
    phone: "+91 22 6820 4400",
    timezone: "Asia/Kolkata (IST)",
    currency: "INR (₹)",
    establishedYear: "1984"
  },
  shipping: {
    freeShippingThreshold: 50000,
    whiteGloveDeliveryCost: 1500,
    standardFreightCost: 900,
    transitInsuranceEnabled: true
  },
  taxes: {
    gstRate: 18,
    gstinNumber: "27AABCA1234F1Z8",
    pricesIncludeTax: false
  },
  payments: {
    razorpayActive: true,
    upiActive: true,
    netBankingActive: true,
    codActive: false, // High end furniture requires prepaid
    emiOptions: true
  }
};
