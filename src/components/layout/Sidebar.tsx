import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { NavModule, UserRole } from '../../types';
import { 
  LayoutDashboard, 
  BarChart3, 
  Clock, 
  Calendar, 
  Receipt, 
  Users, 
  UserCheck, 
  Wallet,
  Scissors,
  Package,
  Megaphone,
  Settings,
  PieChart,
  CheckSquare,
  Percent,
  Globe,
  Sparkles,
  Building2,
  Award,
  DollarSign,
  AlertTriangle,
  UserCheck2,
  BookOpen,
  User,
  CreditCard,
  UserPlus
} from 'lucide-react';

interface SidebarSection {
  title: string;
  items: {
    id: NavModule;
    label: string;
    icon: React.ElementType;
    badge?: number;
  }[];
}

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, activeRole, setActiveRole, appointments, queue } = useSalon();

  const pendingAptsCount = appointments.filter(a => a.status === 'Pending').length;
  const waitingQueueCount = queue.filter(q => q.status === 'Waiting').length;

  const roleMeta: Record<UserRole, { title: string; badge: string; color: string }> = {
    owner: { title: 'Business Owner', badge: '👑 OWNER', color: '#EBD28F' },
    manager: { title: 'Salon Manager', badge: '👔 MANAGER', color: '#0E9C86' },
    receptionist: { title: 'Reception Desk', badge: '🛎️ RECEPTION', color: '#3B82F6' },
    stylist: { title: 'Stylist Portal', badge: '✂️ STYLIST', color: '#EC4899' }
  };

  const getSections = (): SidebarSection[] => {
    switch (activeRole) {
      case 'owner':
        return [
          {
            title: 'BUSINESS COMMAND',
            items: [
              { id: 'dashboard', label: 'Owner Command Center', icon: LayoutDashboard },
              { id: 'ai_insights', label: 'AI Insights & Forecasts', icon: Sparkles },
              { id: 'mis_dashboard', label: 'MIS Dashboard', icon: PieChart },
              { id: 'reports', label: 'Analytics & Growth', icon: BarChart3 }
            ]
          },
          {
            title: 'OPERATIONS',
            items: [
              { id: 'appointments', label: 'Appointments', icon: Calendar, badge: pendingAptsCount > 0 ? pendingAptsCount : undefined },
              { id: 'queue', label: 'Live Queue Control', icon: Clock, badge: waitingQueueCount > 0 ? waitingQueueCount : undefined },
              { id: 'billing', label: 'Billing & POS', icon: Receipt },
              { id: 'services', label: 'Services & Pricing', icon: Scissors }
            ]
          },
          {
            title: 'PEOPLE & TEAM',
            items: [
              { id: 'customers', label: 'Customer CRM', icon: Users },
              { id: 'staff', label: 'Staff & Commissions', icon: UserCheck },
              { id: 'attendance', label: 'Attendance', icon: CheckSquare },
              { id: 'payroll', label: 'Payroll Management', icon: Wallet }
            ]
          },
          {
            title: 'FINANCE & ASSETS',
            items: [
              { id: 'branches', label: 'Multi-Branch OS', icon: Building2 },
              { id: 'expenses', label: 'Expenses & P&L', icon: DollarSign },
              { id: 'inventory', label: 'Inventory & Stock', icon: Package, badge: 3 },
              { id: 'memberships', label: 'Memberships & VIP', icon: Award },
              { id: 'marketing', label: 'Marketing Campaigns', icon: Megaphone }
            ]
          },
          {
            title: 'SETTINGS & SETUP',
            items: [
              { id: 'customer_website', label: 'Customer Website Config', icon: Globe },
              { id: 'booking_rules', label: 'Booking & Queue Rules', icon: Clock },
              { id: 'settings', label: 'Salon Settings', icon: Settings }
            ]
          }
        ];

      case 'manager':
        return [
          {
            title: 'OPERATIONAL FLOOR',
            items: [
              { id: 'dashboard', label: 'Live Floor Overview', icon: LayoutDashboard },
              { id: 'queue', label: 'Live Queue Control', icon: Clock, badge: waitingQueueCount > 0 ? waitingQueueCount : undefined },
              { id: 'appointments', label: 'Daily Appointments', icon: Calendar, badge: pendingAptsCount > 0 ? pendingAptsCount : undefined },
              { id: 'customers', label: 'Customer CRM', icon: Users }
            ]
          },
          {
            title: 'STAFF & INVENTORY',
            items: [
              { id: 'staff', label: 'Staff Roster & Status', icon: UserCheck },
              { id: 'attendance', label: 'Staff Attendance', icon: CheckSquare },
              { id: 'services', label: 'Services & Menu', icon: Scissors },
              { id: 'billing', label: 'Billing / Cashier', icon: Receipt },
              { id: 'inventory', label: 'Stock & Inventory', icon: Package }
            ]
          },
          {
            title: 'FEEDBACK & REPORTS',
            items: [
              { id: 'complaints', label: 'Customer Complaints', icon: AlertTriangle, badge: 2 },
              { id: 'reports', label: 'Daily Ops Report', icon: BarChart3 }
            ]
          }
        ];

      case 'receptionist':
        return [
          {
            title: 'RECEPTION DESK',
            items: [
              { id: 'dashboard', label: 'Reception Dashboard', icon: LayoutDashboard },
              { id: 'appointments', label: 'Bookings & Calendar', icon: Calendar, badge: pendingAptsCount > 0 ? pendingAptsCount : undefined },
              { id: 'walkins', label: 'Walk-in Token Engine', icon: UserPlus },
              { id: 'queue', label: 'Live Queue Control', icon: Clock, badge: waitingQueueCount > 0 ? waitingQueueCount : undefined },
              { id: 'customers', label: 'Customer Lookup', icon: Users },
              { id: 'billing', label: 'POS Billing & GST', icon: Receipt },
              { id: 'payments', label: 'Invoice & Receipts', icon: CreditCard }
            ]
          }
        ];

      case 'stylist':
        return [
          {
            title: 'MY WORKSPACE',
            items: [
              { id: 'my_day', label: 'My Day Overview', icon: LayoutDashboard },
              { id: 'my_appointments', label: 'My Appointments', icon: Calendar },
              { id: 'my_queue', label: 'My Queue', icon: Clock, badge: 1 }
            ]
          },
          {
            title: 'CUSTOMERS & HISTORY',
            items: [
              { id: 'customers', label: 'Customer Notes', icon: Users },
              { id: 'service_history', label: 'Service History', icon: BookOpen }
            ]
          },
          {
            title: 'MY EARNINGS',
            items: [
              { id: 'my_commission', label: 'My Commission Tracker', icon: Percent },
              { id: 'my_profile', label: 'My Stylist Profile', icon: User }
            ]
          }
        ];
    }
  };

  const sections = getSections();

  return (
    <aside className="admin-sidebar-desktop" style={{
      width: '240px',
      height: '100vh',
      backgroundColor: '#14121A',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      zIndex: 50,
      flexShrink: 0,
      color: '#B5B0BE',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Role Badge Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#1A1624'
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 900, color: roleMeta[activeRole].color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          ACTIVE ROLE
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#FFFFFF', marginTop: '0.15rem' }}>
          {roleMeta[activeRole].title}
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{
        flex: 1,
        padding: '1.25rem 0.75rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {sections.map(sec => (
          <div key={sec.title} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#655F73',
              letterSpacing: '0.08em',
              padding: '0 0.5rem',
              marginBottom: '0.2rem'
            }}>
              {sec.title}
            </div>

            {sec.items.map(item => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.65rem',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(201, 162, 78, 0.15)' : 'transparent',
                    color: isActive ? '#EBD28F' : '#A49EB0',
                    border: isActive ? '1px solid rgba(201, 162, 78, 0.4)' : '1px solid transparent',
                    cursor: 'pointer',
                    fontSize: '0.825rem',
                    fontWeight: isActive ? 800 : 600,
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={16} color={isActive ? '#C9A24E' : '#7D7789'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span style={{
                      backgroundColor: '#C9A24E',
                      color: '#121118',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '99px'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Role Switcher Selector at Bottom */}
      <div style={{
        padding: '0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: '#171420',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          SWITCH ROLE EXPERIENCE
        </div>
        <select
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value as UserRole)}
          style={{
            backgroundColor: '#241E2E',
            border: '1px solid rgba(201, 162, 78, 0.4)',
            color: '#EBD28F',
            borderRadius: '8px',
            padding: '0.4rem 0.65rem',
            fontSize: '0.775rem',
            fontWeight: 800,
            outline: 'none',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          <option value="owner">👑 Business Owner</option>
          <option value="manager">👔 Salon Manager</option>
          <option value="receptionist">🛎️ Receptionist</option>
          <option value="stylist">✂️ Stylist / Beautician</option>
        </select>
      </div>
    </aside>
  );
};
