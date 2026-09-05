import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SalonSettings, 
  Staff, 
  Service, 
  Customer, 
  Appointment, 
  QueueEntry, 
  Invoice, 
  Expense, 
  InventoryProduct, 
  MarketingCampaign, 
  NotificationItem,
  NavModule,
  CustomerTab,
  ViewPerspective,
  UserRole,
  AppointmentStatus,
  QueueStatus,
  StaffStatus,
  SmartToken,
  OfferItem,
  GalleryImage,
  RolePermissionRule
} from '../types';

import { 
  initialSettings, 
  initialStaff, 
  initialServices, 
  initialCustomers, 
  initialAppointments, 
  initialQueue, 
  initialInvoices, 
  initialExpenses, 
  initialInventory, 
  initialCampaigns, 
  initialNotifications,
  initialTokens,
  initialOffers,
  initialGallery,
  initialRolePermissions
} from '../mockData';

interface SalonContextType {
  // Perspective & Navigation
  viewPerspective: ViewPerspective;
  setViewPerspective: (perspective: ViewPerspective) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  rolePermissions: RolePermissionRule[];
  toggleRolePermission: (moduleName: string, roleKey: 'manager' | 'receptionist' | 'stylist') => void;
  hasModulePermission: (moduleName: string, role?: UserRole) => boolean;
  activeModule: NavModule;
  setActiveModule: (module: NavModule) => void;
  activeCustomerTab: CustomerTab;
  setActiveCustomerTab: (tab: CustomerTab) => void;

  // Domain Entities
  settings: SalonSettings;
  updateSettings: (newSettings: Partial<SalonSettings>) => void;
  staff: Staff[];
  addStaff: (st: any) => void;
  updateStaffStatus: (staffId: string, status: StaffStatus) => void;
  services: Service[];
  addService: (srv: any) => void;
  updateService: (idOrSrv: any, srvData?: any) => void;
  customers: Customer[];
  addCustomer: (cust: any) => Customer;
  appointments: Appointment[];
  queue: QueueEntry[];
  invoices: Invoice[];
  expenses: Expense[];
  inventory: InventoryProduct[];
  updateStock: (productId: string, qty: number) => void;
  campaigns: MarketingCampaign[];
  notifications: NotificationItem[];
  tokens: SmartToken[];
  offers: OfferItem[];
  gallery: GalleryImage[];

  // Token & Live Queue Engine
  activeCustomerTokenId: string | null;
  setActiveCustomerTokenId: (id: string | null) => void;
  incomingStylistRequest: SmartToken | null;
  setIncomingStylistRequest: (token: SmartToken | null) => void;

  submitCustomerBookingRequest: (params: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    serviceId: string;
    staffId: string;
    date: string;
    time: string;
  }) => SmartToken;

  acceptStylistRequest: (tokenId: string) => void;
  declineStylistRequest: (tokenId: string) => void;
  callNextCustomer: (tokenId: string) => void;
  startTokenService: (tokenId: string) => void;
  completeTokenService: (tokenId: string) => void;

  // Admin Actions
  addAppointment: (apt: Omit<Appointment, 'id' | 'tenantId' | 'appointmentNumber' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addWalkInToQueue: (entryOrCustId: any, srvId?: any, prefStaffId?: any) => void;
  updateQueueStatus: (id: string, status: QueueStatus) => void;
  assignQueueStaff: (queueId: string, staffId: string) => void;
  createInvoice: (inv: Omit<Invoice, 'id' | 'tenantId' | 'invoiceNumber' | 'date'>) => Invoice;
  addExpense: (exp: Omit<Expense, 'id' | 'tenantId'>) => void;
  restockProduct: (productId: string, qty: number) => void;
  markNotificationRead: (id: string) => void;

  // Modals & UI States
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
  isQuickActionOpen: boolean;
  setIsQuickActionOpen: (open: boolean) => void;
  isWalkInOpen: boolean;
  setIsWalkInOpen: (open: boolean) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  activeCustomerProfileId: string | null;
  setActiveCustomerProfileId: (id: string | null) => void;
  activeInvoicePreview: Invoice | null;
  setActiveInvoicePreview: (inv: Invoice | null) => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Perspective State
  const [viewPerspective, setViewPerspective] = useState<ViewPerspective>('admin');
  const [activeRole, setActiveRoleState] = useState<UserRole>('owner');
  const [activeModule, setActiveModule] = useState<NavModule>('dashboard');
  const [activeCustomerTab, setActiveCustomerTab] = useState<CustomerTab>('home');

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (role === 'owner') setActiveModule('dashboard');
    else if (role === 'manager') setActiveModule('dashboard');
    else if (role === 'receptionist') setActiveModule('dashboard');
    else if (role === 'stylist') setActiveModule('my_day');
  };

  // Domain States (with LocalStorage persistence fallback)
  const [settings, setSettings] = useState<SalonSettings>(() => {
    const saved = localStorage.getItem('salon_os_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [rolePermissions, setRolePermissions] = useState<RolePermissionRule[]>(() => {
    const saved = localStorage.getItem('salon_os_role_permissions');
    return saved ? JSON.parse(saved) : initialRolePermissions;
  });

  useEffect(() => {
    localStorage.setItem('salon_os_role_permissions', JSON.stringify(rolePermissions));
  }, [rolePermissions]);

  const toggleRolePermission = (moduleName: string, roleKey: 'manager' | 'receptionist' | 'stylist') => {
    setRolePermissions(prev => prev.map(row => row.module === moduleName ? { ...row, [roleKey]: !row[roleKey] } : row));
  };

  const hasModulePermission = (moduleName: string, role?: UserRole): boolean => {
    const targetRole = role || activeRole;
    if (targetRole === 'owner') return true;
    const rule = rolePermissions.find(r => r.module === moduleName);
    if (!rule) return true;
    return !!rule[targetRole as 'manager' | 'receptionist' | 'stylist'];
  };

  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [queue, setQueue] = useState<QueueEntry[]>(initialQueue);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [inventory, setInventory] = useState<InventoryProduct[]>(initialInventory);
  const [campaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [tokens, setTokens] = useState<SmartToken[]>(initialTokens);
  const [offers] = useState<OfferItem[]>(initialOffers);
  const [gallery] = useState<GalleryImage[]>(initialGallery);

  // Active Token & Incoming Request State
  const [activeCustomerTokenId, setActiveCustomerTokenId] = useState<string | null>('tok-3');
  const [incomingStylistRequest, setIncomingStylistRequest] = useState<SmartToken | null>(null);

  // Modals
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [activeCustomerProfileId, setActiveCustomerProfileId] = useState<string | null>(null);
  const [activeInvoicePreview, setActiveInvoicePreview] = useState<Invoice | null>(null);

  // Sync settings
  useEffect(() => {
    localStorage.setItem('salon_os_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SalonSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addStaff = (stData: any) => {
    const newSt: Staff = {
      servicesCompletedToday: 0,
      revenueToday: 0,
      commissionToday: 0,
      ...stData,
      id: `staff-${Date.now()}`,
      tenantId: settings.tenantId
    };
    setStaff(prev => [...prev, newSt]);
  };

  const updateStaffStatus = (staffId: string, status: StaffStatus) => {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, status } : s));
  };

  const addService = (srvData: any) => {
    const newSrv: Service = {
      ...srvData,
      id: `srv-${Date.now()}`,
      tenantId: settings.tenantId
    };
    setServices(prev => [...prev, newSrv]);
  };

  const updateService = (idOrSrv: any, srvData?: any) => {
    if (typeof idOrSrv === 'string') {
      setServices(prev => prev.map(s => s.id === idOrSrv ? { ...s, ...srvData } : s));
    } else if (idOrSrv && idOrSrv.id) {
      setServices(prev => prev.map(s => s.id === idOrSrv.id ? { ...s, ...idOrSrv } : s));
    }
  };

  const addCustomer = (custData: any): Customer => {
    const newCust: Customer = {
      lastVisit: 'Today',
      loyaltyPoints: 0,
      segment: 'New',
      ...custData,
      id: `cust-${Date.now()}`,
      tenantId: settings.tenantId,
      customerSince: 'Today',
      totalVisits: 0,
      totalSpend: 0
    };
    setCustomers(prev => [newCust, ...prev]);
    return newCust;
  };

  const updateStock = (productId: string, qty: number) => {
    setInventory(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock + qty, lastRestocked: 'Today' } : p));
  };

  // Submit Customer Booking Request
  const submitCustomerBookingRequest = ({
    customerId,
    customerName,
    customerPhone,
    serviceId,
    staffId,
    date,
    time
  }: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    serviceId: string;
    staffId: string;
    date: string;
    time: string;
  }): SmartToken => {
    const selectedService = services.find(s => s.id === serviceId) || services[0];
    const selectedStaff = staff.find(st => st.id === staffId) || staff[0];
    const tokenSeq = tokens.length + 28;
    const generatedTokenNum = `#A${tokenSeq}`;

    const newToken: SmartToken = {
      id: `tok-${Date.now()}`,
      tenantId: settings.tenantId,
      tokenNumber: generatedTokenNum,
      customerId,
      customerName,
      customerPhone,
      serviceId,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      date,
      time,
      status: 'REQUESTED',
      customersAhead: 2,
      estimatedWaitMins: 20,
      suggestedArrivalTime: '10:45 AM',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTokens(prev => [newToken, ...prev]);
    setActiveCustomerTokenId(newToken.id);
    setIncomingStylistRequest(newToken);

    // Notify System
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      tenantId: settings.tenantId,
      title: `⚡ Incoming Booking Request (${generatedTokenNum})`,
      message: `${customerName} requested ${selectedService.name} with ${selectedStaff.name} at ${time}.`,
      type: 'Appointment',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newToken;
  };

  const acceptStylistRequest = (tokenId: string) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'CONFIRMED' } : t));
    const targetToken = tokens.find(t => t.id === tokenId);
    if (targetToken) {
      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        tenantId: settings.tenantId,
        appointmentNumber: `APT-${1000 + appointments.length + 1}`,
        customerId: targetToken.customerId,
        customerName: targetToken.customerName,
        customerPhone: targetToken.customerPhone,
        serviceId: targetToken.serviceId,
        serviceName: targetToken.serviceName,
        servicePrice: targetToken.servicePrice,
        serviceDuration: targetToken.serviceDuration,
        staffId: targetToken.staffId,
        staffName: targetToken.staffName,
        date: targetToken.date,
        time: targetToken.time,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
        tokenNumber: targetToken.tokenNumber
      };
      setAppointments(prev => [newApt, ...prev]);
    }
    setIncomingStylistRequest(null);
  };

  const declineStylistRequest = (tokenId: string) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'EXPIRED' } : t));
    setIncomingStylistRequest(null);
  };

  const callNextCustomer = (tokenId: string) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'NEAR_TURN', estimatedWaitMins: 3 } : t));
  };

  const startTokenService = (tokenId: string) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'IN_SERVICE', estimatedWaitMins: 0 } : t));
    const targetToken = tokens.find(t => t.id === tokenId);
    if (targetToken) {
      setStaff(prev => prev.map(s => s.id === targetToken.staffId ? { ...s, status: 'Busy' } : s));
    }
  };

  const completeTokenService = (tokenId: string) => {
    const targetToken = tokens.find(t => t.id === tokenId);
    if (!targetToken) return;

    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'COMPLETED' } : t));
    setStaff(prev => prev.map(s => s.id === targetToken.staffId ? { ...s, status: 'Available' } : s));

    const earnedPoints = Math.round(targetToken.servicePrice * 0.1);
    setCustomers(prev => prev.map(c => {
      if (c.id === targetToken.customerId) {
        return {
          ...c,
          totalVisits: c.totalVisits + 1,
          totalSpend: c.totalSpend + targetToken.servicePrice,
          loyaltyPoints: c.loyaltyPoints + earnedPoints,
          lastVisit: 'Today'
        };
      }
      return c;
    }));
  };

  const addAppointment = (aptData: Omit<Appointment, 'id' | 'tenantId' | 'appointmentNumber' | 'createdAt'>) => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      tenantId: settings.tenantId,
      appointmentNumber: `APT-${1000 + appointments.length + 1}`,
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addWalkInToQueue = (entryOrCustId: any, srvId?: any, prefStaffId?: any) => {
    const nextQNum = queue.length + 1;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let newEntry: QueueEntry;

    if (typeof entryOrCustId === 'string') {
      const targetCust = customers.find(c => c.id === entryOrCustId);
      const targetSrv = services.find(s => s.id === srvId);
      const targetStaff = staff.find(st => st.id === prefStaffId);

      newEntry = {
        id: `q-${Date.now()}`,
        tenantId: settings.tenantId,
        queueNumber: nextQNum,
        customerId: entryOrCustId,
        customerName: targetCust?.name || 'Walk-in Guest',
        customerPhone: targetCust?.phone || '+91 99999 00000',
        serviceId: srvId || services[0].id,
        serviceName: targetSrv?.name || services[0].name,
        preferredStaffId: prefStaffId,
        preferredStaffName: targetStaff?.name,
        assignedStaffId: prefStaffId,
        assignedStaffName: targetStaff?.name,
        joinedAt: currentTime,
        status: 'Waiting',
        waitTimeMins: nextQNum * 12,
        estimatedStartTime: `${nextQNum * 12} mins wait`,
        tokenNumber: `#W${100 + nextQNum}`
      };
    } else {
      newEntry = {
        ...entryOrCustId,
        id: `q-${Date.now()}`,
        tenantId: settings.tenantId,
        queueNumber: nextQNum,
        joinedAt: currentTime,
        status: 'Waiting',
        estimatedStartTime: `${(nextQNum * 15 + 10)} mins wait`,
        tokenNumber: `#W${100 + nextQNum}`
      };
    }

    setQueue(prev => [...prev, newEntry]);
  };

  const updateQueueStatus = (id: string, status: QueueStatus) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status } : q));
  };

  const assignQueueStaff = (queueId: string, staffId: string) => {
    const targetStaff = staff.find(s => s.id === staffId);
    setQueue(prev => prev.map(q => q.id === queueId ? { 
      ...q, 
      assignedStaffId: staffId, 
      assignedStaffName: targetStaff?.name 
    } : q));
  };

  const createInvoice = (invData: Omit<Invoice, 'id' | 'tenantId' | 'invoiceNumber' | 'date'>): Invoice => {
    const seq = invoices.length + 802;
    const invNum = `${settings.invoicePrefix}-2026-08${seq}`;
    
    const newInv: Invoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      tenantId: settings.tenantId,
      invoiceNumber: invNum,
      date: new Date().toLocaleString()
    };

    setInvoices(prev => [newInv, ...prev]);

    setCustomers(prev => prev.map(c => {
      if (c.id === invData.customerId) {
        return {
          ...c,
          totalVisits: c.totalVisits + 1,
          totalSpend: c.totalSpend + invData.grandTotal,
          lastVisit: 'Today'
        };
      }
      return c;
    }));

    return newInv;
  };

  const addExpense = (expData: Omit<Expense, 'id' | 'tenantId'>) => {
    const newExp: Expense = {
      ...expData,
      id: `exp-${Date.now()}`,
      tenantId: settings.tenantId
    };
    setExpenses(prev => [newExp, ...prev]);
  };

  const restockProduct = (productId: string, qty: number) => {
    setInventory(prev => prev.map(p => p.id === productId ? {
      ...p,
      stock: p.stock + qty,
      lastRestocked: 'Today'
    } : p));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <SalonContext.Provider value={{
      viewPerspective,
      setViewPerspective,
      activeRole,
      setActiveRole,
      rolePermissions,
      toggleRolePermission,
      hasModulePermission,
      activeModule,
      setActiveModule,
      activeCustomerTab,
      setActiveCustomerTab,

      settings,
      updateSettings,
      staff,
      addStaff,
      updateStaffStatus,
      services,
      addService,
      updateService,
      customers,
      addCustomer,
      appointments,
      queue,
      invoices,
      expenses,
      inventory,
      updateStock,
      campaigns,
      notifications,
      tokens,
      offers,
      gallery,

      activeCustomerTokenId,
      setActiveCustomerTokenId,
      incomingStylistRequest,
      setIncomingStylistRequest,

      submitCustomerBookingRequest,
      acceptStylistRequest,
      declineStylistRequest,
      callNextCustomer,
      startTokenService,
      completeTokenService,

      addAppointment,
      updateAppointmentStatus,
      addWalkInToQueue,
      updateQueueStatus,
      assignQueueStaff,
      createInvoice,
      addExpense,
      restockProduct,
      markNotificationRead,

      isGlobalSearchOpen,
      setIsGlobalSearchOpen,
      isQuickActionOpen,
      setIsQuickActionOpen,
      isWalkInOpen,
      setIsWalkInOpen,
      isAppointmentModalOpen,
      setIsAppointmentModalOpen,
      isInvoiceModalOpen,
      setIsInvoiceModalOpen,
      activeCustomerProfileId,
      setActiveCustomerProfileId,
      activeInvoicePreview,
      setActiveInvoicePreview
    }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
