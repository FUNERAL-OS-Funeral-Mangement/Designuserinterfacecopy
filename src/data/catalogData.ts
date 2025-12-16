// Shared catalog data used across My Catalogs (management) and Case E-Catalog (selection)

export interface PackageItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'package';
  imageUrl?: string;
  included: Array<{
    key?: string;
    label: string;
    value: number;
    subtitle?: string;
    description?: string;
    whyItMatters?: string;
  }>;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'addon';
  imageUrl?: string;
}

export const packages: PackageItem[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Service Package',
    description: 'Essential services for a dignified memorial',
    price: 2500,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { key: 'embalming-preparation', label: 'Basic preparation and embalming', value: 700 },
      { key: 'visitation-facilities', label: 'Use of facilities for viewing (2 hours)', value: 350 },
      { label: 'Use of facilities for funeral ceremony', value: 400 },
      { key: 'hearse-transport', label: 'Hearse for local transportation', value: 250 },
      { key: 'memorial-materials', label: 'Basic memorial folders (25)', value: 100 },
      { key: 'professional-service', label: 'Professional staff services and coordination', value: 400 },
    ],
  },
  {
    id: 'pkg-celebration',
    name: 'Celebration of Life Package',
    description: 'Comprehensive celebration with personalized touches',
    price: 4200,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c43f?w=400',
    included: [
      { label: 'All services from Basic Package', value: 2500 },
      { key: 'visitation-facilities', label: 'Extended viewing time (4 hours)', value: 200 },
      { label: 'Personalized memorial video/slideshow', value: 350 },
      { key: 'memorial-materials', label: 'Custom memorial programs (100)', value: 150 },
      { label: 'Memory table setup with photos', value: 100 },
      { label: 'Reception area for refreshments', value: 300 },
      { label: 'Digital memorial webpage', value: 200 },
      { label: 'Professional photography during service', value: 400 },
    ],
  },
  {
    id: 'pkg-premium',
    name: 'Premium Memorial Package',
    description: 'Full-service premium memorial experience',
    price: 6500,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    included: [
      { label: 'All services from Celebration Package', value: 4200 },
      { key: 'visitation-facilities', label: 'Unlimited viewing time', value: 300 },
      { label: 'Premium casket selection assistance', value: 200 },
      { label: 'Limousine service for family', value: 450 },
      { label: 'Custom floral arrangements', value: 300 },
      { label: 'Live streaming of service', value: 250 },
      { key: 'memorial-materials', label: 'Premium memorial programs (200)', value: 200 },
      { label: 'Guest register book with custom cover', value: 100 },
      { label: 'Thank you acknowledgment cards (100)', value: 120 },
      { label: 'Dove release ceremony', value: 380 },
    ],
  },
  {
    id: 'pkg-cremation',
    name: 'Direct Cremation Package',
    description: 'Simple and respectful cremation service',
    price: 1800,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { label: 'Refrigeration and care of remains', value: 200 },
      { label: 'Cremation process', value: 600 },
      { label: 'Basic urn or temporary container', value: 150 },
      { label: 'All required permits and documentation', value: 150 },
      { label: 'Return of cremated remains to family', value: 100 },
      { key: 'professional-service', label: 'Professional staff coordination', value: 300 },
    ],
  },
  {
    id: 'pkg-burial',
    name: 'Burial Package',
    description: 'Traditional burial service with full arrangements',
    price: 5200,
    category: 'package',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    included: [
      { key: 'transfer-remains', label: 'Transfer of remains to funeral home', value: 300 },
      { key: 'embalming-preparation', label: 'Embalming and preparation', value: 750 },
      { key: 'visitation-facilities', label: 'Use of facilities for viewing (4 hours)', value: 500 },
      { label: 'Use of facilities for funeral ceremony', value: 450 },
      { key: 'coordination-services', label: 'Graveside service coordination', value: 400 },
      { key: 'hearse-transport', label: 'Hearse and flower vehicle', value: 300 },
      { label: 'Casket selection assistance', value: 200 },
      { label: 'Burial vault arrangement', value: 300 },
      { key: 'coordination-services', label: 'Cemetery coordination', value: 500 },
      { key: 'memorial-materials', label: 'Memorial programs (100)', value: 150 },
    ],
  },
];

export const addons: AddonItem[] = [
  {
    id: 'addon-prayer-cards',
    name: 'Prayer Cards',
    description: 'Custom printed prayer cards (set of 100)',
    price: 150,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
  },
  {
    id: 'addon-video-tribute',
    name: 'Video Tribute',
    description: 'Professional video slideshow with music',
    price: 350,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400',
  },
  {
    id: 'addon-guest-book',
    name: 'Premium Guest Book',
    description: 'Leather-bound guest register book',
    price: 120,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
  },
  {
    id: 'addon-flowers-standing',
    name: 'Standing Spray Flowers',
    description: 'Beautiful standing floral arrangement',
    price: 300,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
  },
  {
    id: 'addon-flowers-casket',
    name: 'Casket Spray',
    description: 'Premium floral casket spray',
    price: 450,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400',
  },
  {
    id: 'addon-urn-bronze',
    name: 'Bronze Urn',
    description: 'Premium bronze cremation urn',
    price: 850,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
  },
  {
    id: 'addon-live-stream',
    name: 'Live Streaming Service',
    description: 'Professional live stream with recording',
    price: 250,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
  },
  {
    id: 'addon-dove-release',
    name: 'Dove Release Ceremony',
    description: 'Beautiful white dove release (4 doves)',
    price: 380,
    category: 'addon',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400',
  },
];

// Casket catalog data
export interface CasketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  interior: string;
  features: string[];
  imageUrl?: string;
}

export const caskets: CasketItem[] = [
  {
    id: 'casket-oak-serenity',
    name: 'Serenity Oak Casket',
    description: 'Solid oak construction with champagne velvet interior',
    price: 3200,
    category: 'Wood Caskets',
    material: 'Solid Oak',
    interior: 'Champagne Velvet',
    features: ['Hand-crafted corners', 'Adjustable bed', 'Memory drawer'],
    imageUrl: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=600',
  },
  {
    id: 'casket-steel-eternal',
    name: 'Eternal Rest Steel Casket',
    description: '18-gauge steel with protective seal and crepe interior',
    price: 2400,
    category: 'Metal Caskets',
    material: '18-Gauge Steel',
    interior: 'Crepe',
    features: ['Protective gasket seal', 'Rust-resistant finish', 'Swing bar handles'],
    imageUrl: 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=600',
  },
  {
    id: 'casket-mahogany-heritage',
    name: 'Heritage Mahogany Casket',
    description: 'Premium mahogany with hand-carved details and silk interior',
    price: 5800,
    category: 'Premium Wood',
    material: 'Solid Mahogany',
    interior: 'Silk',
    features: ['Hand-carved details', 'Premium hardware', 'Dual sealing system', 'Memory tube'],
    imageUrl: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600',
  },
  {
    id: 'casket-pine-simple',
    name: 'Simple Pine Casket',
    description: 'Natural pine construction, eco-friendly option',
    price: 1200,
    category: 'Eco-Friendly',
    material: 'Natural Pine',
    interior: 'Cotton',
    features: ['Biodegradable materials', 'Simple design', 'Natural finish'],
    imageUrl: 'https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=600',
  },
  {
    id: 'casket-bronze-legacy',
    name: 'Legacy Bronze Casket',
    description: 'Premium bronze construction with timeless design',
    price: 8900,
    category: 'Premium Metal',
    material: 'Solid Bronze',
    interior: 'Velvet',
    features: ['Solid bronze construction', 'Lifetime guarantee', 'Museum-quality finish', 'Engraving available'],
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=600',
  },
  {
    id: 'casket-cherry-classic',
    name: 'Classic Cherry Casket',
    description: 'Beautiful cherry wood with satin interior',
    price: 4100,
    category: 'Wood Caskets',
    material: 'Cherry Wood',
    interior: 'Satin',
    features: ['Rich cherry finish', 'Brass hardware', 'Adjustable interior'],
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
  },
  {
    id: 'casket-copper-radiance',
    name: 'Radiance Copper Casket',
    description: '32-oz solid copper with exceptional durability',
    price: 7200,
    category: 'Premium Metal',
    material: '32-oz Copper',
    interior: 'Velvet',
    features: ['Solid copper construction', 'Superior protection', 'Hand-polished finish', 'Premium lining'],
    imageUrl: 'https://images.unsplash.com/photo-1584907797015-7554cd315667?w=600',
  },
  {
    id: 'casket-willow-nature',
    name: "Nature's Rest Willow Casket",
    description: 'Handwoven willow, fully biodegradable',
    price: 1600,
    category: 'Eco-Friendly',
    material: 'Woven Willow',
    interior: 'Cotton',
    features: ['100% biodegradable', 'Handcrafted', 'Natural materials', 'Eco-certified'],
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600',
  },
];