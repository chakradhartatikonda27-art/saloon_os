import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { NavModule } from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck, 
  Scissors, 
  Receipt, 
  Package, 
  Wallet, 
  Megaphone, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  Clock
} from 'lucide-react';

interface NavItem {
  id: NavModule;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, settings, appointments, queue } = useSalon();

  const pendingAptsCount = appointments.filter(a => a.status === 'Pending').length;
  const waitingQueueCount = queue.filter(q => q.status === 'Waiting').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: pendingAptsCount > 0 ? pendingAptsCount : undefined },
    { id: 'queue', label: 'Live Queue', icon: Clock, badge: waitingQueueCount > 0 ? waitingQueueCount : undefined },
    { id: 'customers', label: 'Customers CRM', icon: Users },
    { id: 'services', label: 'Services & Pricing', icon: Scissors },
    { id: 'staff', label: 'Staff Roster', icon: UserCheck },
    { id: 'billing', label: 'Billing / POS', icon: Receipt },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Salon Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#14121A',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      zIndex: 50,
      flexShrink: 0,
      color: '#B5B0BE'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.25rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2A2237, #C9A24E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(201, 162, 78, 0.3)'
        }}>
          {settings.logo}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h2 style={{
            fontSize: '0.95rem',
            fontWeight: 800,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Salon OS
          </h2>
          <div style={{
            fontSize: '0.725rem',
            color: '#9E99A8',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            <span>{settings.salonName}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{
        flex: 1,
        padding: '1rem 0.75rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <div style={{ 
          fontSize: '0.675rem', 
          fontWeight: 800, 
          color: '#75707E', 
          textTransform: 'uppercase', 
          letterSpacing: '0.08em',
          padding: '0.4rem 0.75rem 0.25rem 0.75rem'
        }}>
          Main OS Modules
        </div>

        {navItems.map(item => {
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
                padding: '0.6rem 0.75rem',
                borderRadius: '10px',
                backgroundColor: isActive ? '#241E2E' : 'transparent',
                color: isActive ? '#FFFFFF' : '#B5B0BE',
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
                <Icon size={17} color={isActive ? '#C9A24E' : '#75707E'} />
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
      </nav>

      {/* Footer Profile */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1B1723'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" 
            alt="Manager Avatar"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #C9A24E'
            }} 
          />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF' }}>
              Ananya Sharma
            </div>
            <div style={{ fontSize: '0.7rem', color: '#9E99A8' }}>
              Manager / Owner
            </div>
          </div>
        </div>

        <button 
          onClick={() => setActiveModule('settings')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#75707E',
            padding: '0.35rem',
            cursor: 'pointer'
          }}
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </aside>
  );
};
