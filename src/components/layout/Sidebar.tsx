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
  Bell, 
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface NavItem {
  id: NavModule;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, settings, appointments, queue, notifications } = useSalon();

  const pendingAptsCount = appointments.filter(a => a.status === 'Pending').length;
  const waitingQueueCount = queue.filter(q => q.status === 'Waiting').length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

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
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      userSelect: 'none',
      zIndex: 50,
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
        }}>
          {settings.logo}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h2 style={{
            fontSize: '1rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            Salon OS
          </h2>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
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
          fontSize: '0.7rem', 
          fontWeight: 700, 
          color: 'var(--text-dim)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.08em',
          padding: '0.5rem 0.75rem 0.25rem 0.75rem'
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
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--primary-glow)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: isActive ? 'var(--border-accent)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? 'var(--primary-500)' : 'currentColor'} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span style={{
                  backgroundColor: item.id === 'appointments' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                  color: item.id === 'appointments' ? '#fbbf24' : '#f472b6',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid currentColor'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Notifications */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        backgroundColor: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" 
              alt="Manager Avatar"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '2px solid var(--primary-500)'
              }} 
            />
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Ananya Sharma
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Manager / Owner
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button 
              onClick={() => setActiveModule('settings')}
              title="Help & Support"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                padding: '0.35rem',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <HelpCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
