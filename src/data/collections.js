export const COLLECTIONS = [
  {
    id: 'living',
    name: 'Living Room',
    tagline: 'Where comfort meets craftsmanship',
    image: '/images/hero-living.jpg',
    products: [
      { name: 'Sovereign Corner Sectional', material: 'Burma Teak + Premium Velvet', image: '/images/hero-living.jpg' },
      { name: 'Royal Chesterfield Suite', material: 'Solid Wood + Italian Leather', image: '/images/hero-living.jpg' },
      { name: 'Fluted Teak Coffee Table', material: 'Solid Burma Teak', image: '/images/hero-living.jpg' },
      { name: 'Sintered Stone TV Console', material: 'Teak + Italian Sintered Stone', image: '/images/hero-living.jpg' },
    ],
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    tagline: 'Rest in handcrafted elegance',
    image: '/images/hero-bedroom.jpg',
    products: [
      { name: 'Imperial Burma Teak King Bed', material: 'Solid Burma Teak + Hydraulic Storage', image: '/images/hero-bedroom.jpg' },
      { name: 'Floating Platform Bed', material: 'Teak + LED Headboard + Ambient Glow', image: '/images/hero-bedroom.jpg' },
      { name: 'Floor-to-Ceiling Wardrobe', material: 'Custom Dimensions + Smart Organizers', image: '/images/hero-bedroom.jpg' },
      { name: 'Vanity Dressing Station', material: 'Teak + LED Mirror + Storage', image: '/images/hero-bedroom.jpg' },
    ],
  },
  {
    id: 'dining',
    name: 'Royal Dining',
    tagline: 'Gather around masterful design',
    image: '/images/hero-dining.jpg',
    products: [
      { name: 'Grand Heritage 8-Seater', material: 'Mahogany + Calacatta Sintered Stone', image: '/images/hero-dining.jpg' },
      { name: 'Sculptural Round Pedestal', material: 'Solid Teak 6-Seater', image: '/images/hero-dining.jpg' },
      { name: 'Display Credenza', material: 'Teak + Glass-Fronted Cabinet', image: '/images/hero-dining.jpg' },
      { name: 'Ergonomic Dining Chairs', material: 'Mahogany + Ivory Bouclé', image: '/images/hero-dining.jpg' },
    ],
  },
  {
    id: 'executive',
    name: 'Executive & Study',
    tagline: 'Command your workspace',
    image: '/images/hero-executive.jpg',
    products: [
      { name: 'Presidential Executive Desk', material: 'Burma Teak + Leather Inlay', image: '/images/hero-executive.jpg' },
      { name: 'Architectural Library Bookshelf', material: 'Floor-to-Ceiling Solid Wood + Glass', image: '/images/hero-executive.jpg' },
      { name: 'Modular Workstation', material: 'Teak + Hidden Cable Routing', image: '/images/hero-executive.jpg' },
      { name: 'Executive Conference Table', material: 'Solid Mahogany 10-Seater', image: '/images/hero-executive.jpg' },
    ],
  },
]

export const ROOM_TYPES = [
  { id: 'living', label: 'Living Room', icon: 'Sofa' },
  { id: 'bedroom', label: 'Master Bedroom', icon: 'BedDouble' },
  { id: 'dining', label: 'Royal Dining', icon: 'UtensilsCrossed' },
  { id: 'executive', label: 'Executive Study', icon: 'Briefcase' },
]

export const TIMBER_OPTIONS = [
  { id: 'burma-teak', label: 'Burma Teak (সেগুন)', grade: 'Premium', color: '#8B5A2B' },
  { id: 'mahogany', label: 'Solid Mahogany', grade: 'Premium', color: '#4A1A0A' },
  { id: 'gamari', label: 'Chittagong Gamari', grade: 'Standard', color: '#A0785A' },
  { id: 'oak', label: 'White Oak', grade: 'Premium', color: '#C4A87C' },
]

export const FABRIC_OPTIONS = [
  { id: 'velvet', label: 'Premium Matte Velvet' },
  { id: 'leather', label: 'Italian Full-Grain Leather' },
  { id: 'boucle', label: 'Luxury Bouclé' },
  { id: 'linen', label: 'Belgian Linen Blend' },
]
