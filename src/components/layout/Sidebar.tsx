import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { NavModule } from '../../types';
import { 
  LayoutDashboard, 
  BarChart3, 
  Clock, 
  Calendar, 
  Receipt, 
  Users, 
  UserCheck, 
  CheckSquare, 
  Wallet,
  Scissors,
  Package,
  Megaphone,
  Settings,
  ShieldCheck
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
  const { activeModule, setActiveModule, settings, appointments, queue, notifications } = useSalon();

  const pendingAptsCount = appointments.filter(a => a.status === 'Pending').length;
  const waitingQueueCount = queue.filter(q => q.status === 'Waiting').length;

  const sections: SidebarSection[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'reports', label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'queue', label: 'Live operations', icon: Clock, badge: waitingQueueCount > 0 ? waitingQueueCount : undefined },
        { id: 'appointments', label: 'Appointments', icon: Calendar, badge: pendingAptsCount > 0 ? pendingAptsCount : undefined },
        { id: 'billing', label: 'Billing / POS', icon: Receipt },
        { id: 'inventory', label: 'Invoices', icon: Package, badge: 40 },
        { id: 'services', label: 'Services & Menu', icon: Scissors }
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'staff', label: 'Staff', icon: UserCheck },
        { id: 'expenses', label: 'Attendance & Payroll', icon: Wallet, badge: 2 },
        { id: 'marketing', label: 'Marketing', icon: Megaphone },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside style={{
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
      {/* Navigation Groups */}
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
              fontSize: '0.675rem',
              fontWeight: 800,
              color: '#75707E',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.2rem 0.75rem'
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
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#241E2E' : 'transparent',
                    color: isActive ? '#ffffff' : '#B5B0BE',
                    border: '1px solid',
                    borderColor: isActive ? '#C9A24E' : 'transparent',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={16} color={isActive ? '#C9A24E' : '#75707E'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span style={{
                      backgroundColor: '#D9584A',
                      color: '#ffffff',
                      fontSize: '0.675rem',
                      fontWeight: 800,
                      padding: '0.1rem 0.45rem',
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

      {/* Footer Pro Plan Badge & Collapse */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem'
      }}>
        <div style={{
          backgroundColor: '#241E2E',
          border: '1px solid rgba(201, 162, 78, 0.3)',
          borderRadius: '8px',
          padding: '0.6rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem'
        }}>
          <span style={{
            backgroundColor: '#C9A24E',
            color: '#14121A',
            fontSize: '0.65rem',
            fontWeight: 800,
            padding: '0.1rem 0.4rem',
            borderRadius: '4px',
            width: 'fit-content'
          }}>
            Pro plan
          </span>
          <span style={{ fontSize: '0.7rem', color: '#75707E' }}>
            Renews 30 Sep 2026
          </span>
        </div>

        <button style={{
          background: 'transparent',
          border: 'none',
          color: '#75707E',
          fontSize: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: 'center',
          padding: '0.25rem'
        }}>
          « Collapse
        </button>
      </div>
    </aside>
  );
};
