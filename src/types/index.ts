export type UserRole = 'owner' | 'manager' | 'receptionist' | 'stylist';

export type NavModule = 
  | 'dashboard'
  | 'mis_dashboard'
  | 'appointments'
  | 'queue'
  | 'queue_control'
  | 'customers'
  | 'services'
  | 'staff'
  | 'billing'
  | 'inventory'
  | 'attendance'
  | 'payroll'
  | 'commissions'
  | 'expenses'
  | 'marketing'
  | 'reports'
  | 'services_config'
  | 'customer_website'
  | 'booking_rules'
  | 'settings'
  | 'ai_insights'
  | 'branches'
  | 'memberships'
  | 'finance'
  | 'complaints'
  | 'walkins'
  | 'payments'
  | 'my_day'
  | 'my_appointments'
  | 'my_queue'
  | 'service_history'
  | 'my_commission'
  | 'my_profile';

export type CustomerTab = 
  | 'home'
  | 'services'
  | 'book'
  | 'token'
  | 'account';

export type ViewPerspective = 'admin' | 'customer';

export type AppointmentStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Arrived'
  | 'Waiting'
  | 'In Service'
  | 'Completed'
  | 'Cancelled'
  | 'No Show';

export type QueueStatus = 
  | 'Waiting'
  | 'In Service'
  | 'Completed'
  | 'Cancelled';

export type TokenStatus = 
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'WAITING'
  | 'NEAR_TURN'
  | 'IN_SERVICE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export type StaffStatus = 
  | 'Available'
  | 'Busy'
  | 'Break'
  | 'Off';

export type StaffRole = 
  | 'Owner'
  | 'Manager'
  | 'Receptionist'
  | 'Stylist'
  | 'Barber'
  | 'Therapist';

export interface RolePermissionRule {
  module: string;
  label: string;
  owner: boolean;
  manager: boolean;
  receptionist: boolean;
  stylist: boolean;
}

export type ServiceCategory = 
  | 'Hair'
  | 'Beard'
  | 'Facial'
  | 'Spa'
  | 'Color'
  | 'Skin'
  | 'Packages'
  | 'Other';

export type PaymentMethod = 
  | 'Cash'
  | 'UPI'
  | 'Card'
  | 'Other';

export type InvoiceStatus = 
  | 'Draft'
  | 'Paid'
  | 'Partially Paid'
  | 'Cancelled';

export type ExpenseCategory = 
  | 'Rent'
  | 'Salary'
  | 'Utilities'
  | 'Inventory'
  | 'Marketing'
  | 'Maintenance'
  | 'Equipment'
  | 'Other';

export type CustomerSegment = 
  | 'All'
  | 'New'
  | 'Returning'
  | 'VIP'
  | 'Inactive'
  | 'Membership';

export interface ServiceVariant {
  id: string;
  name: string;
  price: number;
  duration: number; // in mins
}

export interface Service {
  id: string;
  tenantId: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  price: number; // INR
  variants?: ServiceVariant[];
  tax: number; // percentage (e.g. 18)
  gender: 'All' | 'Men' | 'Women';
  assignedStaffIds: string[];
  active: boolean;
  imageUrl?: string;
}

export interface Staff {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  role: StaffRole;
  status: StaffStatus;
  avatar: string;
  specialization: string[];
  commissionType: 'percentage' | 'fixed';
  commissionValue: number;
  rating: number;
  todayAppointmentsCount: number;
  servicesCompletedToday: number;
  revenueToday: number;
  commissionToday: number;
  attendanceStatus: 'Present' | 'Late' | 'Absent' | 'On Leave';
  workingHours: string;
  experienceYears?: number;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  gender: 'Male' | 'Female' | 'Other';
  customerSince: string;
  totalVisits: number;
  totalSpend: number;
  lastVisit: string;
  favoriteStaffId?: string;
  favoriteStaffName?: string;
  favoriteServices: string[];
  membership: 'None' | 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  notes: string[];
  segment: CustomerSegment;
}

export interface Appointment {
  id: string;
  tenantId: string;
  appointmentNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  status: AppointmentStatus;
  notes?: string;
  isWalkIn?: boolean;
  createdAt: string;
  tokenNumber?: string;
}

export interface SmartToken {
  id: string;
  tenantId: string;
  tokenNumber: string; // e.g. #A27
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  staffId: string;
  staffName: string;
  date: string;
  time: string;
  status: TokenStatus;
  customersAhead: number;
  estimatedWaitMins: number;
  suggestedArrivalTime: string;
  createdAt: string;
}

export interface QueueEntry {
  id: string;
  tenantId: string;
  queueNumber: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  preferredStaffId?: string;
  preferredStaffName?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  joinedAt: string;
  waitTimeMins: number;
  status: QueueStatus;
  estimatedStartTime: string;
  tokenNumber?: string;
}

export interface InvoiceItem {
  id: string;
  type: 'Service' | 'Product';
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  staffId?: string;
  staffName?: string;
  total: number;
}

export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  status: InvoiceStatus;
  notes?: string;
}

export interface Expense {
  id: string;
  tenantId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  description: string;
  addedBy: string;
}

export interface InventoryProduct {
  id: string;
  tenantId: string;
  name: string;
  category: string;
  sku: string;
  stock: number;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  minStockThreshold: number;
  supplier: string;
  lastRestocked: string;
}

export interface OfferItem {
  id: string;
  title: string;
  description: string;
  discountText: string;
  validUntil: string;
  code: string;
  bgGradient: string;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface MarketingCampaign {
  id: string;
  tenantId: string;
  title: string;
  type: 'Offer' | 'Coupon' | 'Reminder' | 'Birthday' | 'Re-engagement';
  segment: CustomerSegment;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  message: string;
  sentCount: number;
  convertedCount: number;
  revenueGenerated: number;
  status: 'Active' | 'Scheduled' | 'Completed' | 'Draft';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  tenantId: string;
  title: string;
  message: string;
  type: 'Appointment' | 'Stock' | 'Payment' | 'Queue' | 'System';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isMain: boolean;
}

export interface SalonSettings {
  tenantId: string;
  salonName: string;
  slug: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  gstin: string;
  businessHours: string;
  slotDurationMins: number;
  bufferTimeMins: number;
  autoConfirmOnlineBookings: boolean;
  invoicePrefix: string;
  defaultTaxRate: number;
  currencySymbol: string;
  whatsappEnabled: boolean;
  subscriptionPlan: 'Growth Pro' | 'Starter' | 'Enterprise';
  currentBranchId: string;
  branches: Branch[];
}
