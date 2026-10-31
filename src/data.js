import heroMelbourneHome from './assets/images/hero_melbourne_home_1793352800980.jpg';
import propSouthYarraApt from './assets/images/prop_south_yarra_apt_1793352802295.jpg';
import propHawthornFamily from './assets/images/prop_hawthorn_family_1793352804101.jpg';
import propFitzroyTownhouse from './assets/images/prop_fitzroy_townhouse_1793352804699.jpg';
import propBrightonVilla from './assets/images/prop_brighton_villa_1793352805251.jpg';
import propCamberwellSuburban from './assets/images/prop_camberwell_suburban_1793352806718.jpg';
import propRichmondInvestment from './assets/images/prop_richmond_investment_1793352807491.jpg';
import propBrunswickTerrace from './assets/images/prop_brunswick_terrace_1793352809263.jpg';
import propPrahranLoft from './assets/images/prop_prahran_loft_1793352810143.jpg';
import hoodSouthYarra from './assets/images/hood_south_yarra_1793352811534.jpg';
import hoodFitzroy from './assets/images/hood_fitzroy_1793352812379.jpg';
import hoodRichmond from './assets/images/hood_richmond_1793352813266.jpg';
import hoodBrighton from './assets/images/hood_brighton_1793352814984.jpg';
import editorialListProperty from './assets/images/editorial_list_property_1793352815231.jpg';
import editorialWhyNestora from './assets/images/editorial_why_nestora_1793352816105.jpg';

export const MEDIA = {
  hero: heroMelbourneHome,
  listProperty: editorialListProperty,
  whyNestora: editorialWhyNestora
};

export const PROPERTIES = [
  {
    id: 'prop-sy-408',
    title: 'Canopy Residence on Claremont',
    address: '408/18 Claremont Street, South Yarra VIC 3141',
    suburb: 'South Yarra',
    listingType: 'buy',
    category: 'Modern Apartment',
    price: 945000,
    priceDisplay: '$945,000',
    priceNote: 'Private Sale · Indicative Guide',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaSqm: 96,
    featured: true,
    shortDescription:
      'North-facing apartment framed by mature plane tree canopies, wide European oak floorboards, and a sheltered dining balcony moments from South Yarra station.',
    fullDescription: [
      'Positioned on the fourth level of a boutique architectural building, this sunlit residence balances everyday practicality with calm natural finishes. Floor-to-ceiling double-glazed sliders draw morning and midday warmth across wide European oak floorboards while framing leafy streetscape views.',
      'The open kitchen pairs stone benchtops with integrated appliances and generous pantry joinery, flowing effortlessly to a dining zone and covered outdoor terrace. Both bedrooms are thoughtfully separated for privacy, making the floorplan equally suited to owner-occupiers or professionals working from home.'
    ],
    features: [
      'North-facing living & covered dining terrace',
      'Double-glazed acoustic windows throughout',
      'European oak engineered timber flooring',
      'Ducted zoned heating and cooling',
      'Standard basement car space (non-stacker) & storage cage',
      '350m walk to South Yarra train station & trams'
    ],
    inspectionTime: 'Saturday 10:30 am – 11:00 am (Sample Schedule)',
    outgoingsContext: 'Sample OC Fees: $1,120 / qtr · Council Rates: $1,380 / yr',
    image: propSouthYarraApt,
    imageAlt: 'Sunlit modern apartment living and dining room in South Yarra overlooking green plane trees',
    gallery: [
      {
        src: propSouthYarraApt,
        caption: 'Open-plan living and dining overlooking leafy Claremont Street plane trees',
        alt: 'Modern apartment living room with oak floors and greenery outside windows'
      },
      {
        src: editorialWhyNestora,
        caption: 'Quiet reading corner and bespoke oak joinery detail',
        alt: 'Built-in oak window seat overlooking tranquil courtyard greenery'
      },
      {
        src: hoodSouthYarra,
        caption: 'Walkable South Yarra avenue and neighborhood cafe culture',
        alt: 'Leafy South Yarra streetscape with corner cafe and plane trees'
      }
    ]
  },
  {
    id: 'prop-haw-24',
    title: 'Elmhurst Brick & Cedar Family Residence',
    address: '24 Elmhurst Road, Hawthorn VIC 3122',
    suburb: 'Hawthorn',
    listingType: 'buy',
    category: 'Family Home',
    price: 2480000,
    priceDisplay: '$2,480,000',
    priceNote: 'Expressions of Interest · Family Residence',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    areaSqm: 312,
    featured: true,
    shortDescription:
      'Architect-designed two-storey family home combining warm pale brickwork, natural cedar cladding, two generous living zones, and low-maintenance native gardens.',
    fullDescription: [
      'Set along a quiet tree-lined Hawthorn avenue, 24 Elmhurst Road was designed around natural daylight, durable materials, and adaptable family living. A welcoming stone pathway leads past drought-tolerant native landscaping into a wide sunlit hallway with sightlines straight through to the rear garden.',
      'Downstairs offers a quiet front study or guest suite alongside an expansive kitchen, walk-in pantry, and living pavilion. Upstairs, three further bedrooms surround a bright family retreat, giving growing households room to gather and unwind comfortably.'
    ],
    features: [
      'Two distinct living zones plus ground-floor study',
      'Stone kitchen with walk-in pantry & induction cooking',
      '6.6kW rooftop solar array & rainwater garden irrigation',
      'Internal-access double garage with EV charger readiness',
      'Hydronic slab heating & zoned refrigerated cooling',
      'Close to Glenferrie Road trams, parklands & local schools'
    ],
    inspectionTime: 'Saturday 11:45 am – 12:15 pm (Sample Schedule)',
    outgoingsContext: 'Land Size: 540 m² (approx.) · Council Rates: $3,240 / yr',
    image: propHawthornFamily,
    imageAlt: 'Contemporary pale brick and cedar two-storey family home in Hawthorn with native front garden',
    gallery: [
      {
        src: propHawthornFamily,
        caption: 'Pale brick and natural cedar street elevation with native landscaping',
        alt: 'Contemporary two-storey family house exterior in Hawthorn'
      },
      {
        src: editorialListProperty,
        caption: 'Expansive rear dining and living pavilion opening to the garden',
        alt: 'Sunlit dining and living room opening to green garden lawn'
      },
      {
        src: heroMelbourneHome,
        caption: 'Limestone courtyard transition and sheltered outdoor entertaining',
        alt: 'Architectural courtyard and glass sliding doors at golden hour'
      }
    ]
  },
  {
    id: 'prop-fit-11b',
    title: 'Kerr Street Warehouse-Style Townhouse',
    address: '11B Kerr Street, Fitzroy VIC 3065',
    suburb: 'Fitzroy',
    listingType: 'buy',
    category: 'Townhouse',
    price: 1690000,
    priceDisplay: '$1,690,000',
    priceNote: 'Private Sale · Freehold Title',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    areaSqm: 205,
    featured: false,
    shortDescription:
      'Tri-level recycled brick townhouse featuring steel-framed glazing, generous ceiling heights, and a planted rooftop terrace in the heart of Fitzroy.',
    fullDescription: [
      'Inspired by Fitzroy’s heritage craft buildings, 11B Kerr Street pairs recycled red brickwork and matte steel framing with modern thermal comfort. Spread across three light-filled levels on its own title, the residence provides generous separation between sleeping quarters and entertaining spaces.',
      'The mid-level kitchen and living floor enjoys dual-aspect cross-ventilation, while the top-floor planted rooftop deck offers an elevated outdoor retreat surrounded by established olive and native coastal plantings.'
    ],
    features: [
      'Freehold title with zero owners corporation fees',
      'Planted private rooftop terrace with built-in seating & water point',
      'Recycled brickwork & thermally broken steel-look glazing',
      'Secure street-level garage with bicycle workshop space',
      'Hydronic panel heating & ceiling fans in all bedrooms',
      '200m to Brunswick Street & Nicholson Street trams'
    ],
    inspectionTime: 'Saturday 1:00 pm – 1:30 pm (Sample Schedule)',
    outgoingsContext: 'Freehold Title · Sample Council Rates: $2,410 / yr',
    image: propFitzroyTownhouse,
    imageAlt: 'Three-level recycled red brick townhouse in Fitzroy with steel-framed windows and rooftop plants',
    gallery: [
      {
        src: propFitzroyTownhouse,
        caption: 'Recycled brick corner facade with private planted rooftop terrace',
        alt: 'Three-level brick townhouse exterior in Fitzroy'
      },
      {
        src: propBrunswickTerrace,
        caption: 'Sunlit dining zone and custom joinery detail',
        alt: 'Bright contemporary interior dining table beneath skylight'
      },
      {
        src: hoodFitzroy,
        caption: 'Surrounding Fitzroy heritage streetscape moments from home',
        alt: 'Fitzroy streetscape with red-brick buildings and leafy street trees'
      }
    ]
  },
  {
    id: 'prop-bri-07',
    title: 'Seacombe Coastal Courtyard Villa',
    address: '7 Seacombe Grove, Brighton VIC 3186',
    suburb: 'Brighton',
    listingType: 'buy',
    category: 'Contemporary Villa',
    price: 3350000,
    priceDisplay: '$3,350,000',
    priceNote: 'Private Negotiation · Bayside Precinct',
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    areaSqm: 348,
    featured: false,
    shortDescription:
      'Refined contemporary villa with textured off-white render, timber batten pergola, travertine terrace, and solar-heated lap pool near Brighton foreshore.',
    fullDescription: [
      'Just a short stroll from the Brighton foreshore walking trail, 7 Seacombe Grove captures relaxed coastal living with enduring architectural restraint. Textured mineral render and vertical timber battens soften the exterior while providing natural afternoon sun shading.',
      'Inside, wide limestone tiles and full-height glazing wrap around a sheltered northern pool terrace, allowing effortless visibility from the kitchen and main living area. A ground-floor main bedroom suite ensures long-term single-level livability.'
    ],
    features: [
      'Ground-floor primary bedroom suite with garden outlook',
      'Solar & heat-pump heated 11m lap pool with travertine surrounds',
      'Architectural timber batten pergola & outdoor shower',
      'Natural stone kitchen with integrated refrigeration',
      'Double lock-up garage with internal mudroom storage',
      '450m walk to Port Phillip Bay foreshore paths & Church Street'
    ],
    inspectionTime: 'Saturday 2:15 pm – 2:45 pm (Sample Schedule)',
    outgoingsContext: 'Land Size: 615 m² (approx.) · Council Rates: $4,190 / yr',
    image: propBrightonVilla,
    imageAlt: 'Contemporary coastal villa in Brighton with timber pergola and turquoise lap pool',
    gallery: [
      {
        src: propBrightonVilla,
        caption: 'Northern pool courtyard, travertine terrace, and timber batten pergola',
        alt: 'Brighton contemporary villa exterior and lap pool'
      },
      {
        src: heroMelbourneHome,
        caption: 'Seamless indoor-outdoor living opening onto landscaped grounds',
        alt: 'Contemporary indoor-outdoor glass sliders and courtyard'
      },
      {
        src: hoodBrighton,
        caption: 'Nearby Brighton foreshore walking and cycling trail',
        alt: 'Brighton coastal path overlooking Port Phillip Bay'
      }
    ]
  },
  {
    id: 'prop-cam-39',
    title: 'Inglesby Renovated Garden House',
    address: '39 Inglesby Road, Camberwell VIC 3124',
    suburb: 'Camberwell',
    listingType: 'buy',
    category: 'Suburban House',
    price: 2150000,
    priceDisplay: '$2,150,000',
    priceNote: 'Private Sale · Renovated Period Extension',
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    areaSqm: 268,
    featured: false,
    shortDescription:
      'Classic suburban bungalow thoughtfully extended with a warm timber-and-glass family room opening directly onto a wide deck and sunny level lawn.',
    fullDescription: [
      'Retaining its welcoming period street presence while opening into a thoroughly modern rear extension, 39 Inglesby Road is tailored for practical everyday family life. High clerestory windows bring northern light deep into the kitchen and dining space throughout the seasons.',
      'Wide sliding doors stack back to connect the indoor living room with a spotted-gum entertaining deck, built-in barbecue bench, and deep grassed backyard shaded by established deciduous trees.'
    ],
    features: [
      'Architect-designed rear timber & clerestory glass extension',
      'Level family lawn with established perimeter gardens',
      'Spotted-gum alfresco deck with plumbed outdoor kitchen',
      'Separate front lounge or fourth bedroom flexibility',
      'Walk-in laundry with side drying courtyard access',
      'Easy walk to Camberwell Junction, parks & train station'
    ],
    inspectionTime: 'Saturday 11:00 am – 11:30 am (Sample Schedule)',
    outgoingsContext: 'Land Size: 642 m² (approx.) · Council Rates: $2,980 / yr',
    image: propCamberwellSuburban,
    imageAlt: 'Renovated Camberwell suburban house rear timber extension with deck and green backyard',
    gallery: [
      {
        src: propCamberwellSuburban,
        caption: 'Rear timber-and-glass extension stepping down to the family lawn',
        alt: 'Backyard view of renovated Camberwell house and timber deck'
      },
      {
        src: editorialListProperty,
        caption: 'Natural timber dining and open-plan family living room',
        alt: 'Spacious family dining table overlooking garden'
      }
    ]
  },
  {
    id: 'prop-ric-205',
    title: 'Bridge & Vine Boutique Residence',
    address: '205/64 Bridge Road, Richmond VIC 3121',
    suburb: 'Richmond',
    listingType: 'buy',
    category: 'Investment Property',
    price: 685000,
    priceDisplay: '$685,000',
    priceNote: 'Private Sale · Strong Rental Profile',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    areaSqm: 78,
    featured: false,
    shortDescription:
      'Well-proportioned boutique apartment featuring soft sage joinery, a waterfall stone island, sunlit balcony, and consistent inner-east tenant appeal.',
    fullDescription: [
      'Located in a quiet rear wing of a low-rise brick building of just 24 residences, 205/64 Bridge Road offers smart proportions and enduring materiality. Custom sage-toned cabinetry, a full-size waterfall stone island, and wide oak flooring elevate it well above typical high-density apartments.',
      'Positioned steps from city-bound trams, Epworth precinct employment, and Yarra parklands, the property suits both first-home buyers and long-term investors seeking low-maintenance inner-Melbourne fundamentals.'
    ],
    features: [
      'Low-rise boutique block of 24 residences with lift access',
      'Full-size waterfall stone island kitchen with induction cooktop',
      'Covered east-facing balcony overlooking quiet residential pocket',
      'Indicative sample rental appraisal: $680 – $720 / week',
      'Standard basement car space (no car stacker) & bicycle room',
      'Doorstep tram access to Melbourne CBD & MCG precinct'
    ],
    inspectionTime: 'Saturday 12:30 pm – 1:00 pm (Sample Schedule)',
    outgoingsContext: 'Sample OC Fees: $890 / qtr · Council Rates: $1,140 / yr',
    image: propRichmondInvestment,
    imageAlt: 'Modern Richmond apartment kitchen with soft sage cabinetry, stone island, and sunlit balcony',
    gallery: [
      {
        src: propRichmondInvestment,
        caption: 'Sage joinery kitchen with stone waterfall island and balcony light',
        alt: 'Apartment kitchen with sage green cabinets and stone island'
      },
      {
        src: hoodRichmond,
        caption: 'Leafy surrounding Richmond residential streets',
        alt: 'Sunny Richmond residential streetscape'
      }
    ]
  },
  {
    id: 'prop-bru-82',
    title: 'Barkly Skylit Courtyard Terrace',
    address: '82 Barkly Street, Brunswick VIC 3056',
    suburb: 'Brunswick',
    listingType: 'rent',
    category: 'Suburban House',
    price: 890,
    priceDisplay: '$890 / week',
    priceNote: '12-Month Lease · Bond $3,867',
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    areaSqm: 158,
    featured: false,
    shortDescription:
      'Thoughtfully renovated single-fronted terrace with an architectural skylight, painted brick texture, polished concrete floors, and lush fern courtyard.',
    fullDescription: [
      'Behind a classic Brunswick heritage facade lies a calm, light-drenched contemporary home. An overhead architectural skylight washes the painted brick wall and solid dining zone in natural daylight, while steel-framed glass doors open directly onto a private courtyard shaded by tree ferns.',
      'Three generous bedrooms with built-in robes, two renovated bathrooms, hydronic slab heating, and rear laneway off-street parking create a comfortable, low-upkeep inner-north rental home.'
    ],
    features: [
      'Available from 14 November (Demonstration Listing)',
      'Architectural skylight & polished thermal-mass concrete floor',
      'Private decked courtyard with established native ferns',
      'Dishwasher, induction stove & generous pantry storage',
      'In-slab heating & split-system air conditioning',
      'Short walk to Barkly Square, Princes Park & Lygon Street trams'
    ],
    inspectionTime: 'Thursday 5:15 pm – 5:35 pm · Saturday 10:00 am (Sample)',
    outgoingsContext: 'Water usage billed separately · Quarterly garden trim included',
    image: propBrunswickTerrace,
    imageAlt: 'Renovated Brunswick terrace dining space with skylight, white brick wall, and leafy courtyard',
    gallery: [
      {
        src: propBrunswickTerrace,
        caption: 'Skylit dining room opening directly to the private fern courtyard',
        alt: 'Brunswick terrace interior with skylight and courtyard greenery'
      },
      {
        src: editorialWhyNestora,
        caption: 'Calm courtyard outlook and warm natural timber details',
        alt: 'Oak window seat overlooking courtyard ferns'
      }
    ]
  },
  {
    id: 'prop-pra-04',
    title: 'Greville Double-Height Loft Townhouse',
    address: '4/29 Greville Street, Prahran VIC 3181',
    suburb: 'Prahran',
    listingType: 'rent',
    category: 'Townhouse',
    price: 1180,
    priceDisplay: '$1,180 / week',
    priceNote: '12–24 Month Lease · Bond $5,127',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    areaSqm: 210,
    featured: false,
    shortDescription:
      'Architectural dual-level townhouse highlighted by a double-height window void, sculpted oak staircase, and tranquil courtyard off Greville Street.',
    fullDescription: [
      'Tucked privately behind Prahran’s Greville Street village, this contemporary townhouse delivers gallery-like volume and quiet residential comfort. Tall black-framed windows span two storeys, filling both the main lounge and upper mezzanine hallway with soft natural light.',
      'Designed for effortless everyday living, the home includes a stone kitchen, separate laundry, private landscaped courtyard, and secure side-by-side basement parking for two vehicles.'
    ],
    features: [
      'Available Now · Long-term lease welcomed (Demonstration)',
      'Soaring double-height living room void with garden aspect',
      'Sculpted solid oak staircase & mezzanine study landing',
      'Ducted heating/cooling plus motorized upper-window blinds',
      'Two side-by-side secure basement car spaces',
      '250m to Prahran Market, Prahran Station & Grattan Gardens'
    ],
    inspectionTime: 'Wednesday 5:30 pm – 5:50 pm · Saturday 11:15 am (Sample)',
    outgoingsContext: 'Embedded solar hot water · NBN Fibre-to-the-Premises ready',
    image: propPrahranLoft,
    imageAlt: 'Contemporary Prahran townhouse living room with double-height windows and curved oak staircase',
    gallery: [
      {
        src: propPrahranLoft,
        caption: 'Double-height living room with custom curved oak staircase',
        alt: 'Townhouse living room with tall windows and timber stairs'
      },
      {
        src: propSouthYarraApt,
        caption: 'Warm neutral finishes and generous dining proportions',
        alt: 'Light-filled contemporary dining and living space'
      }
    ]
  },
  {
    id: 'prop-ric-14',
    title: 'Swan & Elm Garden Apartment',
    address: '104/31 Elm Grove, Richmond VIC 3121',
    suburb: 'Richmond',
    listingType: 'rent',
    category: 'Modern Apartment',
    price: 740,
    priceDisplay: '$740 / week',
    priceNote: '12-Month Lease · Bond $3,215',
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    areaSqm: 89,
    featured: false,
    shortDescription:
      'Quiet leafy street apartment in Richmond featuring wide oak boards, two full bathrooms, built-in study joinery, and a terrace overlooking elm trees.',
    fullDescription: [
      'Positioned along one of Richmond’s loveliest residential pockets, 104/31 Elm Grove offers peaceful tree-top outlooks just minutes from Swan Street dining and East Richmond station. Thoughtful cross-flow layout separates both double bedrooms on opposite sides of the living room.',
      'Ideal for sharers, couples, or remote professionals, the apartment includes built-in study joinery, European laundry cabinetry, and secure basement parking.'
    ],
    features: [
      'Available from 21 November (Demonstration Listing)',
      'Quiet residential street setting beneath mature elm trees',
      'Two full bathrooms including private main ensuite',
      'Built-in study desk nook with integrated cable management',
      'Split-system heating/cooling in living room & both bedrooms',
      '400m to East Richmond Station & Swan Street trams'
    ],
    inspectionTime: 'Saturday 9:45 am – 10:05 am (Sample Schedule)',
    outgoingsContext: 'NBN FTTP connected · Secure parcel lockers in lobby',
    image: editorialWhyNestora,
    imageAlt: 'Warm sunlit oak window seat and tranquil courtyard view in Richmond garden apartment',
    gallery: [
      {
        src: editorialWhyNestora,
        caption: 'Built-in oak window seat overlooking tranquil courtyard greenery',
        alt: 'Sunlit oak window seat overlooking lush courtyard'
      },
      {
        src: propRichmondInvestment,
        caption: 'Open stone kitchen and oak living room finishes',
        alt: 'Contemporary kitchen with stone island and oak floors'
      },
      {
        src: hoodRichmond,
        caption: 'Quiet leafy Richmond streetscape outside your door',
        alt: 'Leafy Richmond residential footpath at late afternoon'
      }
    ]
  },
  {
    id: 'prop-bri-19',
    title: 'Bay Trail Courtyard Residence',
    address: '2/19 New Street, Brighton VIC 3186',
    suburb: 'Brighton',
    listingType: 'rent',
    category: 'Contemporary Villa',
    price: 1350,
    priceDisplay: '$1,350 / week',
    priceNote: '12-Month Lease · Garden Care Included',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    areaSqm: 224,
    featured: false,
    shortDescription:
      'Sun-drenched bayside residence offering limestone courtyard living, three spacious bedrooms, and effortless walks to Brighton beach paths.',
    fullDescription: [
      'Crafted with natural limestone, warm timber soffits, and expansive sliding glass, 2/19 New Street brings calm bayside architecture to the rental market. The ground-floor living and dining pavilion opens seamlessly onto a private north-west courtyard framed by olive trees and native grasses.',
      'Periodic garden care is included in the lease so residents can spend weekends enjoying nearby foreshore paths, local cafes, and bay breezes.'
    ],
    features: [
      'Periodic professional garden maintenance included in rent',
      'Sunlit limestone courtyard with established olive tree',
      'Three generous upstairs bedrooms plus ground-floor powder room',
      'Zoned ducted heating and refrigerated air conditioning',
      'Internal-access double garage with storage wall',
      'Short stroll to Brighton foreshore & Brighton Beach station'
    ],
    inspectionTime: 'Saturday 1:45 pm – 2:05 pm (Sample Schedule)',
    outgoingsContext: 'Garden care included · Bond $5,850 (Demonstration)',
    image: heroMelbourneHome,
    imageAlt: 'Sunlit contemporary Brighton home with limestone courtyard and olive garden',
    gallery: [
      {
        src: heroMelbourneHome,
        caption: 'North-west limestone courtyard and open-plan ground-floor living',
        alt: 'Sunlit contemporary home opening to limestone courtyard'
      },
      {
        src: hoodBrighton,
        caption: 'Moments from the Brighton coastal walking path',
        alt: 'Brighton foreshore walking path overlooking the bay'
      }
    ]
  }
];

export const NEIGHBORHOODS = [
  {
    id: 'south-yarra',
    name: 'South Yarra',
    postcode: 'VIC 3141',
    tagline: 'Botanic avenues & effortless village walkability',
    description:
      'Canopied plane-tree streets, morning laps around the Royal Botanic Gardens, and refined apartment architecture steps from trams and neighborhood cafes.',
    image: hoodSouthYarra,
    alt: 'Leafy South Yarra streetscape with corner cafe outdoor tables and mature plane trees'
  },
  {
    id: 'fitzroy',
    name: 'Fitzroy',
    postcode: 'VIC 3065',
    tagline: 'Heritage craft brickwork & creative inner-north energy',
    description:
      'Restored red-brick warehouses, quiet bluestone laneways, independent bookshops, and architectural townhouses just north of Melbourne’s CBD.',
    image: hoodFitzroy,
    alt: 'Heritage red-brick warehouse residences and green street trees in Fitzroy Melbourne'
  },
  {
    id: 'richmond',
    name: 'Richmond',
    postcode: 'VIC 3121',
    tagline: 'Riverside trails, cottage streets & connected living',
    description:
      'Renovated period cottages alongside contemporary townhouses, linked by Yarra River bike paths, bustling grocers, and five convenient train stations.',
    image: hoodRichmond,
    alt: 'Golden afternoon light along a leafy residential street of cottages and modern homes in Richmond'
  },
  {
    id: 'brighton',
    name: 'Brighton',
    postcode: 'VIC 3186',
    tagline: 'Calm Port Phillip foreshore & sunlit coastal homes',
    description:
      'Bayside walking trails, Norfolk pines, generous family gardens, and contemporary coastal villas shaped around light, sea air, and open space.',
    image: hoodBrighton,
    alt: 'Brighton coastal walking trail beside Port Phillip Bay at golden hour'
  }
];

export const TESTIMONIALS = [
  {
    quote:
      'Being able to compare floorplan sizes, outgoings notes, and natural light orientation before attending Saturday inspections saved us weeks of guesswork during our search.',
    author: 'Claire & Daniel M.',
    context: 'Sample Buyer Scenario · Hawthorn Family Search'
  },
  {
    quote:
      'The rental listings actually answered practical questions upfront—heating type, parking dimensions, and realistic commute context—making inspection booking straightforward.',
    author: 'Liam T.',
    context: 'Sample Renter Scenario · Relocating to Brunswick'
  },
  {
    quote:
      'Thoughtful photography and honest, well-structured copy attracted genuinely prepared inquiries from the very first open home rather than casual foot traffic.',
    author: 'Priya S.',
    context: 'Sample Homeowner Scenario · Richmond Apartment Campaign'
  }
];

export const FAQS = [
  {
    question: 'Are the properties shown on Nestora Property Co. currently on the market?',
    answer:
      'No. Nestora Property Co. is a fictional Melbourne real estate brand created as a web development portfolio demonstration. All property addresses, prices, outgoings, and inspection times are carefully crafted sample data designed to showcase search, filtering, comparison, and inquiry workflows.'
  },
  {
    question: 'How do property inquiries and viewing requests work on this site?',
    answer:
      'Every "View Details", "Request a Viewing", "Talk to Our Team", and Contact form works interactively right in your browser with client-side field validation and instant confirmation states. Because no backend or external CRM is connected in this demonstration, your form inputs stay strictly local and are never transmitted or stored externally.'
  },
  {
    question: 'Can I filter, save favorites, and compare homes without creating an account?',
    answer:
      'Yes. You can filter properties by Buy or Rent, suburb, property category, price range, and bedrooms with zero page reloads. Saved favorites are stored locally in your browser via localStorage, and you can select up to three properties at once to compare floor area, features, and pricing side by side.'
  },
  {
    question: 'How would this platform connect to live listings for a real property agency?',
    answer:
      'In a production agency deployment, the structured listing schema powering this frontend can connect directly to Australian real estate CRM feeds (such as VaultRE, Rex, or Agentbox) and forward validated inquiry forms to the agency’s email or CRM pipeline while maintaining fast static edge delivery on Cloudflare Pages.'
  }
];

export const LEGAL_DOCS = {
  privacy: {
    title: 'Privacy Policy (Portfolio Demonstration)',
    updated: 'October 2026',
    paragraphs: [
      'Nestora Property Co. is a fictional real estate demonstration website created to showcase modern frontend design, responsive architecture, and user-experience craft.',
      'No personal data submitted into demonstration forms (including Property Inquiries, Viewing Requests, Appraisal Requests, or General Contact forms) leaves your browser. Form validation and confirmation messages execute entirely client-side using JavaScript.',
      'When you save favorite properties using the heart button, property IDs are stored locally in your browser’s localStorage under the key "nestora_favorites" solely to preserve your saved state between visits. You may clear browser storage at any time.'
    ]
  },
  terms: {
    title: 'Terms of Use & Demonstration Disclaimer',
    updated: 'October 2026',
    paragraphs: [
      'All residential properties, street numbers, pricing guides, rental figures, owners corporation estimates, testimonials, and Melbourne office contact details presented on this website are fictional examples created strictly for portfolio demonstration purposes.',
      'Nothing on this website constitutes a real estate offer, financial or property investment advice, or a licensed estate agency representation in Victoria or elsewhere in Australia.',
      'Design, layout structure, and frontend engineering demonstrate lightweight HTML, CSS, and JavaScript compatible with static edge hosting platforms including Cloudflare Pages.'
    ]
  }
};
