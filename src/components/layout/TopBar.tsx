import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { UserRole } from '../../types';
import { 
  Search, 
  Scissors,
  Globe,
  UserCheck
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    activeModule, 
    activeRole,
    setActiveRole,
    settings, 
    setIsGlobalSearchOpen, 
    setIsWalkInOpen,
    setViewPerspective,
    updateSettings
  } = useSalon();

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'dashboard': 
        if (activeRole === 'owner') return "Owner Command Center";
        if (activeRole === 'manager') return "Live Operational Floor";
        if (activeRole === 'receptionist') return "Reception Desk";
        return "Salon Dashboard";
      case 'ai_insights': return "AI Insights & Forecasts";
      case 'mis_dashboard': return "MIS Executive Dashboard";
      case 'appointments': return "Appointments Management";
      case 'queue': return "Live Queue Control";
      case 'queue_control': return "Queue Matrix";
      case 'customers': return "Customer CRM";
      case 'services': return "Services & Pricing";
      case 'staff': return "Staff Roster & Commission";
      case 'billing': return "Billing & POS Cashier";
      case 'attendance': return "Attendance Management";
      case 'payroll': return "Payroll Management";
      case 'commissions': return "Commissions Engine";
      case 'branches': return "Multi-Branch OS";
      case 'memberships': return "Memberships & VIP Tiers";
      case 'finance': return "Finance & Daily Closing";
      case 'expenses': return "Expenses & Outflows";
      case 'complaints': return "Customer Feedback & Issues";
      case 'walkins': return "Walk-in Token Engine";
      case 'payments': return "Payments & Receipts";
      case 'my_day': return "Good Morning, Stylist!";
      case 'my_appointments': return "My Scheduled Appointments";
      case 'my_queue': return "My Customer Queue";
      case 'service_history': return "Service History Log";
      case 'my_commission': return "My Personal Commission";
      case 'my_profile': return "My Stylist Profile";
      case 'services_config': return "Services Menu Config";
      case 'customer_website': return "Customer Website Config";
      case 'booking_rules': return "Booking & Token Rules";
      case 'marketing': return "Marketing Campaigns";
      case 'reports': return "Analytics & Growth";
      case 'settings': return "Salon Settings";
      default: return "Salon OS";
    }
  };

  return (
    <header style={{
      minHeight: '56px',
      backgroundColor: 'var(--bg-topbar)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.5rem 0.85rem',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}>
      {/* Left Title & Branch Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flexShrink: 1 }}>
        <h1 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {getModuleTitle()}
        </h1>

        {/* Branch Selector Dropdown */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <select
            value={settings.currentBranchId}
            onChange={(e) => updateSettings({ currentBranchId: e.target.value })}
            style={{
              backgroundColor: '#FAF8F5',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.5rem',
              outline: 'none',
              cursor: 'pointer',
              maxWidth: '130px'
            }}
          >
            {settings.branches.map(branch => (
              <option key={branch.id} value={branch.id} style={{ background: '#FFFFFF', color: '#1E1A25' }}>
                📍 {branch.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
        {/* Role Switcher Pill */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FAF7F2', border: '1px solid rgba(201, 162, 78, 0.4)', borderRadius: '8px', padding: '0.15rem 0.35rem' }}>
          <UserCheck size={14} color="#C9A24E" style={{ marginRight: '0.25rem' }} />
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as UserRole)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#121118',
              fontSize: '0.75rem',
              fontWeight: 900,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="owner">👑 Owner</option>
            <option value="manager">👔 Manager</option>
            <option value="receptionist">🛎️ Receptionist</option>
            <option value="stylist">✂️ Stylist</option>
          </select>
        </div>

        {/* Switch to Public Customer Web App */}
        <button
          onClick={() => setViewPerspective('customer')}
          className="btn btn-sm"
          style={{
            backgroundColor: '#2A2237',
            color: '#EBD28F',
            border: '1px solid #C9A24E',
            fontWeight: 800,
            fontSize: '0.725rem',
            padding: '0.35rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
          title="Switch to Public Customer Web View"
        >
          <Globe size={14} color="#C9A24E" />
          <span className="hide-mobile">Public Web</span>
        </button>

        {/* Global Search Button */}
        <button 
          onClick={() => setIsGlobalSearchOpen(true)}
          style={{
            backgroundColor: '#FAF8F5',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.35rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <Search size={14} />
          <span className="hide-mobile">Search</span>
        </button>

        {/* Walk-in Queue Quick Add CTA */}
        <button 
          onClick={() => setIsWalkInOpen(true)}
          className="btn btn-primary btn-sm pulse-glow-ring"
          style={{
            backgroundColor: '#0E9C86',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.35rem 0.65rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Scissors size={14} />
          <span>+ Walk-in</span>
        </button>
      </div>
    </header>
  );
};
