import { 
  Customer, 
  Staff, 
  Service, 
  Appointment, 
  QueueEntry, 
  Invoice, 
  Expense, 
  InventoryProduct, 
  MarketingCampaign, 
  NotificationItem, 
  SalonSettings,
  SmartToken,
  OfferItem,
  GalleryImage,
  RolePermissionRule
} from './types';

export const initialRolePermissions: RolePermissionRule[] = [
  { module: 'dashboard', label: 'Executive / Floor Dashboard', owner: true, manager: true, receptionist: true, stylist: true },
  { module: 'ai_insights', label: 'AI Insights & Business Assistant', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'mis_dashboard', label: 'MIS Executive Analytics', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'appointments', label: 'Appointments Management', owner: true, manager: true, receptionist: true, stylist: true },
  { module: 'queue', label: 'Live Queue Operations Control', owner: true, manager: true, receptionist: true, stylist: true },
  { module: 'billing', label: 'POS Billing & GST Invoicing', owner: true, manager: true, receptionist: true, stylist: false },
  { module: 'customers', label: 'Customer CRM & History', owner: true, manager: true, receptionist: true, stylist: true },
  { module: 'services', label: 'Services & Pricing Menu', owner: true, manager: true, receptionist: true, stylist: false },
  { module: 'staff', label: 'Staff Roster & Management', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'attendance', label: 'Staff Attendance Tracking', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'payroll', label: 'Payroll & Salary Config', owner: true, manager: false, receptionist: false, stylist: false },
  { module: 'commissions', label: 'Staff Commission Engine', owner: true, manager: true, receptionist: false, stylist: true },
  { module: 'expenses', label: 'Expenses & P&L Statements', owner: true, manager: false, receptionist: false, stylist: false },
  { module: 'inventory', label: 'Inventory & Stock Control', owner: true, manager: true, receptionist: true, stylist: false },
  { module: 'marketing', label: 'Marketing & WhatsApp Campaigns', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'reports', label: 'Analytics & Export Reports', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'customer_website', label: 'Customer Website Config', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'booking_rules', label: 'Booking & Token Rules', owner: true, manager: true, receptionist: false, stylist: false },
  { module: 'settings', label: 'Salon Settings & Security RBAC', owner: true, manager: true, receptionist: false, stylist: false }
];

export const initialSettings: SalonSettings = {
  tenantId: 'tenant-urban-glow-1',
  salonName: 'Urban Glow Luxury Salon & Spa',
  slug: 'urban-glow',
  logo: '✨',
  phone: '+91 98765 43210',
  email: 'contact@urbanglowsalon.in',
  address: 'Indiranagar 100ft Road, Bengaluru, KA - 560038',
  gstin: '29ABCDE1234F1Z5',
  businessHours: '09:00 AM - 09:00 PM (Mon - Sun)',
  slotDurationMins: 30,
  bufferTimeMins: 10,
  autoConfirmOnlineBookings: false,
  invoicePrefix: 'UG-INV',
  defaultTaxRate: 18,
  currencySymbol: '₹',
  whatsappEnabled: true,
  subscriptionPlan: 'Growth Pro',
  currentBranchId: 'branch-1',
  branches: [
    { id: 'branch-1', name: 'Indiranagar Flagship', address: '100ft Road, Indiranagar', phone: '+91 98765 43210', isMain: true },
    { id: 'branch-2', name: 'Koramangala Branch', address: '5th Block, Koramangala', phone: '+91 98765 99887', isMain: false },
    { id: 'branch-3', name: 'Whitefield Studio', address: 'ITPL Main Rd, Whitefield', phone: '+91 98765 11223', isMain: false },
  ]
};

export const initialOffers: OfferItem[] = [
  {
    id: 'off-1',
    title: 'Monsoon Argan Hair Spa Deal',
    description: 'Deep scalp hydration + steaming + therapeutic head massage.',
    discountText: 'FLAT 20% OFF',
    validUntil: 'Valid till 05 Sep 2026',
    code: 'GLOW20',
    bgGradient: 'linear-gradient(135deg, #241E2E, #C9A24E)',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'off-2',
    title: 'Gentlemen Weekend Combo',
    description: 'Signature Cut + Royal Beard Sculpting + Hot Towel Treatment.',
    discountText: 'ONLY ₹699 (Save ₹250)',
    validUntil: 'Weekend Special',
    code: 'GROOM699',
    bgGradient: 'linear-gradient(135deg, #14121A, #3A2E4A)',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'off-3',
    title: 'Gold Loyalty Membership Discount',
    description: 'Upgrade to Gold Membership & get ₹500 instant wallet credit.',
    discountText: 'GET ₹500 BONUS',
    validUntil: 'Limited Edition',
    code: 'GOLDVIP',
    bgGradient: 'linear-gradient(135deg, #2A2237, #C9A24E)',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
  }
];

export const initialGallery: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Luxury Styling Stations',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-2',
    title: 'Private Hair Spa Suite',
    category: 'Spa',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-3',
    title: 'Reception & Beverage Lounge',
    category: 'Lounge',
    url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-4',
    title: 'Master Stylists Team',
    category: 'Team',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialTokens: SmartToken[] = [
  {
    id: 'tok-1',
    tenantId: 'tenant-urban-glow-1',
    tokenNumber: '#A25',
    customerId: 'cust-2',
    customerName: 'Priya Patel',
    customerPhone: '+91 98765 12345',
    serviceId: 'srv-3',
    serviceName: 'Argan Oil Deep Repair Hair Spa',
    servicePrice: 1450,
    serviceDuration: 60,
    staffId: 'staff-2',
    staffName: 'Meena R.',
    date: '2026-08-31',
    time: '10:00 AM',
    status: 'IN_SERVICE',
    customersAhead: 0,
    estimatedWaitMins: 0,
    suggestedArrivalTime: '10:00 AM',
    createdAt: '2026-08-31 09:30 AM'
  },
  {
    id: 'tok-2',
    tenantId: 'tenant-urban-glow-1',
    tokenNumber: '#A26',
    customerId: 'cust-3',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 97654 32109',
    serviceId: 'srv-2',
    serviceName: 'Royale Beard Sculpting & Trim',
    servicePrice: 300,
    serviceDuration: 25,
    staffId: 'staff-1',
    staffName: 'Arun Kumar',
    date: '2026-08-31',
    time: '10:30 AM',
    status: 'WAITING',
    customersAhead: 0,
    estimatedWaitMins: 8,
    suggestedArrivalTime: '10:20 AM',
    createdAt: '2026-08-31 10:00 AM'
  },
  {
    id: 'tok-3',
    tenantId: 'tenant-urban-glow-1',
    tokenNumber: '#A27',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 99887 76655',
    serviceId: 'srv-1',
    serviceName: 'Classic Signature Haircut',
    servicePrice: 450,
    serviceDuration: 30,
    staffId: 'staff-1',
    staffName: 'Arun Kumar',
    date: '2026-08-31',
    time: '11:00 AM',
    status: 'CONFIRMED',
    customersAhead: 1,
    estimatedWaitMins: 18,
    suggestedArrivalTime: '10:50 AM',
    createdAt: '2026-08-31 10:15 AM'
  }
];

export const initialStaff: Staff[] = [
  {
    id: 'staff-1',
    tenantId: 'tenant-urban-glow-1',
    name: 'Arun Kumar',
    phone: '+91 98111 22334',
    email: 'arun@urbanglow.in',
    role: 'Stylist',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    specialization: ['Men Haircut', 'Beard Styling', 'Hair Color'],
    commissionType: 'percentage',
    commissionValue: 12,
    rating: 4.9,
    todayAppointmentsCount: 7,
    servicesCompletedToday: 4,
    revenueToday: 8400,
    commissionToday: 1008,
    attendanceStatus: 'Present',
    workingHours: '09:00 AM - 06:00 PM',
    experienceYears: 12
  },
  {
    id: 'staff-2',
    tenantId: 'tenant-urban-glow-1',
    name: 'Meena R.',
    phone: '+91 98222 33445',
    email: 'meena@urbanglow.in',
    role: 'Therapist',
    status: 'Busy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    specialization: ['Hair Spa', 'Hydra Facial', 'Head Massage'],
    commissionType: 'percentage',
    commissionValue: 15,
    rating: 4.95,
    todayAppointmentsCount: 6,
    servicesCompletedToday: 3,
    revenueToday: 11200,
    commissionToday: 1680,
    attendanceStatus: 'Present',
    workingHours: '10:00 AM - 07:00 PM',
    experienceYears: 9
  },
  {
    id: 'staff-3',
    tenantId: 'tenant-urban-glow-1',
    name: 'Ravi Varma',
    phone: '+91 98333 44556',
    email: 'ravi@urbanglow.in',
    role: 'Barber',
    status: 'Break',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    specialization: ['Beard Styling', 'Classic Cut', 'Head Shave'],
    commissionType: 'fixed',
    commissionValue: 150,
    rating: 4.8,
    todayAppointmentsCount: 5,
    servicesCompletedToday: 3,
    revenueToday: 3850,
    commissionToday: 450,
    attendanceStatus: 'Present',
    workingHours: '09:00 AM - 06:00 PM',
    experienceYears: 8
  },
  {
    id: 'staff-4',
    tenantId: 'tenant-urban-glow-1',
    name: 'Suresh K.',
    phone: '+91 98444 55667',
    email: 'suresh@urbanglow.in',
    role: 'Stylist',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    specialization: ['Women Haircut', 'Keratin Treatment', 'Hair Styling'],
    commissionType: 'percentage',
    commissionValue: 10,
    rating: 4.7,
    todayAppointmentsCount: 4,
    servicesCompletedToday: 2,
    revenueToday: 5200,
    commissionToday: 520,
    attendanceStatus: 'Present',
    workingHours: '11:00 AM - 08:00 PM',
    experienceYears: 6
  },
  {
    id: 'staff-5',
    tenantId: 'tenant-urban-glow-1',
    name: 'Ananya Sharma',
    phone: '+91 98555 66778',
    email: 'ananya@urbanglow.in',
    role: 'Manager',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    specialization: ['Reception', 'Salon Management', 'VIP Relations'],
    commissionType: 'percentage',
    commissionValue: 5,
    rating: 5.0,
    todayAppointmentsCount: 0,
    servicesCompletedToday: 0,
    revenueToday: 0,
    commissionToday: 0,
    attendanceStatus: 'Present',
    workingHours: '09:00 AM - 07:00 PM',
    experienceYears: 10
  }
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    tenantId: 'tenant-urban-glow-1',
    name: 'Classic Signature Haircut',
    category: 'Hair',
    description: 'Precision haircut with head wash, blow-dry, and styling.',
    duration: 30,
    price: 450,
    variants: [
      { id: 'v-1', name: 'Basic Trim', price: 350, duration: 20 },
      { id: 'v-2', name: 'Signature Cut & Wash', price: 450, duration: 30 },
      { id: 'v-3', name: 'Luxury Cut + Scalp Massage', price: 650, duration: 45 }
    ],
    tax: 18,
    gender: 'All',
    assignedStaffIds: ['staff-1', 'staff-3', 'staff-4'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'srv-2',
    tenantId: 'tenant-urban-glow-1',
    name: 'Royale Beard Sculpting & Trim',
    category: 'Beard',
    description: 'Hot towel treatment, sharp line-up, and nourishing beard oil.',
    duration: 25,
    price: 300,
    tax: 18,
    gender: 'Men',
    assignedStaffIds: ['staff-1', 'staff-3'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'srv-3',
    tenantId: 'tenant-urban-glow-1',
    name: 'Argan Oil Deep Repair Hair Spa',
    category: 'Spa',
    description: 'Intense moisture restoration, scalp massage, steam treatment.',
    duration: 60,
    price: 1450,
    tax: 18,
    gender: 'All',
    assignedStaffIds: ['staff-2', 'staff-4'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'srv-4',
    tenantId: 'tenant-urban-glow-1',
    name: 'Charcoal Glow & Detox Facial',
    category: 'Facial',
    description: 'Deep pore cleansing, blackhead extraction, LED therapy.',
    duration: 50,
    price: 1850,
    tax: 18,
    gender: 'All',
    assignedStaffIds: ['staff-2'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'srv-5',
    tenantId: 'tenant-urban-glow-1',
    name: 'Global Hair Color & Gloss',
    category: 'Color',
    description: 'Ammonia-free global color with shine boost serum.',
    duration: 90,
    price: 3200,
    tax: 18,
    gender: 'Women',
    assignedStaffIds: ['staff-1', 'staff-4'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'srv-6',
    tenantId: 'tenant-urban-glow-1',
    name: 'Grooming Combo (Cut + Beard + Facial)',
    category: 'Packages',
    description: 'Ultimate transformation package for gentlemen.',
    duration: 90,
    price: 2200,
    tax: 18,
    gender: 'Men',
    assignedStaffIds: ['staff-1', 'staff-3'],
    active: true,
    imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=400'
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    tenantId: 'tenant-urban-glow-1',
    name: 'Rahul Sharma',
    phone: '+91 99887 76655',
    email: 'rahul.sharma@example.com',
    gender: 'Male',
    customerSince: '14 Jan 2024',
    totalVisits: 18,
    totalSpend: 14200,
    lastVisit: '30 Aug 2026',
    favoriteStaffId: 'staff-1',
    favoriteStaffName: 'Arun Kumar',
    favoriteServices: ['Classic Signature Haircut', 'Royale Beard Sculpting'],
    membership: 'Gold',
    loyaltyPoints: 1250,
    notes: ['Prefers short fade on sides.', 'Usually books weekend mornings.'],
    segment: 'VIP'
  },
  {
    id: 'cust-2',
    tenantId: 'tenant-urban-glow-1',
    name: 'Priya Patel',
    phone: '+91 98765 12345',
    email: 'priya.patel@example.com',
    gender: 'Female',
    customerSince: '05 Mar 2024',
    totalVisits: 12,
    totalSpend: 28900,
    lastVisit: '22 Aug 2026',
    favoriteStaffId: 'staff-2',
    favoriteStaffName: 'Meena R.',
    favoriteServices: ['Argan Oil Deep Repair Hair Spa', 'Charcoal Glow Facial'],
    membership: 'Platinum',
    loyaltyPoints: 2400,
    notes: ['Sensitive scalp, prefers organic shampoos.', 'Loves hot lemon tea during spa.'],
    segment: 'VIP'
  },
  {
    id: 'cust-3',
    tenantId: 'tenant-urban-glow-1',
    name: 'Vikram Malhotra',
    phone: '+91 97654 32109',
    email: 'vikram.m@example.com',
    gender: 'Male',
    customerSince: '10 May 2025',
    totalVisits: 5,
    totalSpend: 3800,
    lastVisit: '15 Aug 2026',
    favoriteStaffId: 'staff-3',
    favoriteStaffName: 'Ravi Varma',
    favoriteServices: ['Classic Signature Haircut'],
    membership: 'Silver',
    loyaltyPoints: 380,
    notes: ['Likes quick service during lunch hour.'],
    segment: 'Returning'
  },
  {
    id: 'cust-4',
    tenantId: 'tenant-urban-glow-1',
    name: 'Sneha Reddy',
    phone: '+91 96543 21098',
    email: 'sneha.reddy@example.com',
    gender: 'Female',
    customerSince: '01 Aug 2026',
    totalVisits: 1,
    totalSpend: 3200,
    lastVisit: '01 Aug 2026',
    favoriteStaffId: 'staff-4',
    favoriteStaffName: 'Suresh K.',
    favoriteServices: ['Global Hair Color & Gloss'],
    membership: 'None',
    loyaltyPoints: 160,
    notes: ['First time walk-in from Instagram promo.'],
    segment: 'New'
  },
  {
    id: 'cust-5',
    tenantId: 'tenant-urban-glow-1',
    name: 'Amitabh Roy',
    phone: '+91 95432 10987',
    email: 'amitabh.roy@example.com',
    gender: 'Male',
    customerSince: '12 Nov 2023',
    totalVisits: 24,
    totalSpend: 21500,
    lastVisit: '10 May 2026',
    favoriteStaffId: 'staff-1',
    favoriteStaffName: 'Arun Kumar',
    favoriteServices: ['Grooming Combo'],
    membership: 'Gold',
    loyaltyPoints: 1850,
    notes: ['Has not visited in last 90 days. Send re-engagement voucher.'],
    segment: 'Inactive'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    tenantId: 'tenant-urban-glow-1',
    appointmentNumber: 'APT-1001',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 99887 76655',
    serviceId: 'srv-1',
    serviceName: 'Classic Signature Haircut',
    servicePrice: 450,
    serviceDuration: 30,
    staffId: 'staff-1',
    staffName: 'Arun Kumar',
    date: '2026-08-31',
    time: '09:30 AM',
    status: 'Confirmed',
    notes: 'Regular haircut and wash.',
    createdAt: '2026-08-30 08:30 PM',
    tokenNumber: '#A27'
  },
  {
    id: 'apt-2',
    tenantId: 'tenant-urban-glow-1',
    appointmentNumber: 'APT-1002',
    customerId: 'cust-2',
    customerName: 'Priya Patel',
    customerPhone: '+91 98765 12345',
    serviceId: 'srv-3',
    serviceName: 'Argan Oil Deep Repair Hair Spa',
    servicePrice: 1450,
    serviceDuration: 60,
    staffId: 'staff-2',
    staffName: 'Meena R.',
    date: '2026-08-31',
    time: '10:00 AM',
    status: 'In Service',
    notes: 'Requested steam and tea.',
    createdAt: '2026-08-30 09:15 PM',
    tokenNumber: '#A25'
  },
  {
    id: 'apt-3',
    tenantId: 'tenant-urban-glow-1',
    appointmentNumber: 'APT-1003',
    customerId: 'cust-3',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 97654 32109',
    serviceId: 'srv-2',
    serviceName: 'Royale Beard Sculpting & Trim',
    servicePrice: 300,
    serviceDuration: 25,
    staffId: 'staff-1',
    staffName: 'Arun Kumar',
    date: '2026-08-31',
    time: '10:30 AM',
    status: 'Arrived',
    notes: 'Sitting in reception lounge.',
    createdAt: '2026-08-31 09:00 AM',
    tokenNumber: '#A26'
  }
];

export const initialQueue: QueueEntry[] = [
  {
    id: 'q-1',
    tenantId: 'tenant-urban-glow-1',
    queueNumber: 1,
    customerId: 'cust-3',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 97654 32109',
    serviceId: 'srv-2',
    serviceName: 'Royale Beard Sculpting & Trim',
    preferredStaffId: 'staff-1',
    preferredStaffName: 'Arun Kumar',
    assignedStaffId: 'staff-1',
    assignedStaffName: 'Arun Kumar',
    joinedAt: '10:18 AM',
    waitTimeMins: 12,
    status: 'Waiting',
    estimatedStartTime: '10:30 AM',
    tokenNumber: '#A26'
  },
  {
    id: 'q-2',
    tenantId: 'tenant-urban-glow-1',
    queueNumber: 2,
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 99887 76655',
    serviceId: 'srv-1',
    serviceName: 'Classic Signature Haircut',
    preferredStaffId: 'staff-1',
    preferredStaffName: 'Arun Kumar',
    joinedAt: '10:22 AM',
    waitTimeMins: 18,
    status: 'Waiting',
    estimatedStartTime: '10:45 AM',
    tokenNumber: '#A27'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-101',
    tenantId: 'tenant-urban-glow-1',
    invoiceNumber: 'UG-INV-2026-0801',
    date: '2026-08-30 05:30 PM',
    customerId: 'cust-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 99887 76655',
    items: [
      { id: 'it-1', type: 'Service', itemId: 'srv-1', name: 'Classic Signature Haircut', quantity: 1, unitPrice: 450, staffId: 'staff-1', staffName: 'Arun Kumar', total: 450 },
      { id: 'it-2', type: 'Service', itemId: 'srv-2', name: 'Royale Beard Sculpting', quantity: 1, unitPrice: 300, staffId: 'staff-1', staffName: 'Arun Kumar', total: 300 }
    ],
    subtotal: 750,
    discount: 50,
    tax: 126,
    grandTotal: 826,
    paymentMethod: 'UPI',
    status: 'Paid',
    notes: 'Paid via GPay.'
  }
];

export const initialExpenses: Expense[] = [
  {
    id: 'exp-1',
    tenantId: 'tenant-urban-glow-1',
    title: 'Monthly Salon Rent (Indiranagar)',
    category: 'Rent',
    amount: 65000,
    date: '2026-08-01',
    paymentMethod: 'UPI',
    description: 'Store lease monthly payment to landlord.',
    addedBy: 'Ananya Sharma'
  }
];

export const initialInventory: InventoryProduct[] = [
  {
    id: 'prod-1',
    tenantId: 'tenant-urban-glow-1',
    name: 'Argan Hair Nourishing Serum 100ml',
    category: 'Hair Care',
    sku: 'LRL-ARG-100',
    stock: 14,
    unit: 'bottles',
    purchasePrice: 480,
    sellingPrice: 850,
    minStockThreshold: 5,
    supplier: 'Loreal Professional India',
    lastRestocked: '20 Aug 2026'
  }
];

export const initialCampaigns: MarketingCampaign[] = [
  {
    id: 'cmp-1',
    tenantId: 'tenant-urban-glow-1',
    title: 'Monsoon Hair Care 20% OFF Voucher',
    type: 'Offer',
    segment: 'Inactive',
    channel: 'WhatsApp',
    message: 'Hey {Name}! We miss you at Urban Glow. Get 20% OFF your next Hair Spa or Facial this week! Reply YES to book.',
    sentCount: 140,
    convertedCount: 22,
    revenueGenerated: 31800,
    status: 'Active',
    createdAt: '15 Aug 2026'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    tenantId: 'tenant-urban-glow-1',
    title: 'New Online Booking Request',
    message: 'Rahul Sharma requested Classic Signature Haircut for today at 11:00 AM.',
    type: 'Appointment',
    timestamp: '5 mins ago',
    read: false
  }
];
