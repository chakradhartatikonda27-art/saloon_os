import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  Scissors,
  Globe
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const { 
    activeModule, 
    settings, 
    setIsGlobalSearchOpen, 
    setIsQuickActionOpen, 
    setIsWalkInOpen,
    setViewPerspective,
    updateSettings
  } = useSalon();

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'dashboard': return "Salon Overview";
      case 'appointments': return "Appointments Management";
      case 'queue': return "Live Queue Control";
      case 'customers': return "Customer CRM";
      case 'services': return "Services & Pricing";
      case 'staff': return "Staff Roster & Commission";
      case 'billing': return "Billing & POS Cashier";
      case 'inventory': return "Inventory & Products";
      case 'expenses': return "Expenses & Outflows";
      case 'marketing': return "Marketing & Campaigns";
      case 'reports': return "Analytics & Reports";
      case 'settings': return "Salon Settings";
      default: return "Salon OS";
    }
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-topbar)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Left Title & Branch Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {getModuleTitle()}
        </h1>

        {/* Branch Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={settings.currentBranchId}
            onChange={(e) => updateSettings({ currentBranchId: e.target.value })}
            style={{
              backgroundColor: '#FAF8F5',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.35rem 0.75rem',
              paddingRight: '1.75rem',
              outline: 'none',
              cursor: 'pointer'
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

      {/* Right Controls & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Switch to Public Customer Web App */}
        <button
          onClick={() => setViewPerspective('customer')}
          className="btn btn-sm"
          style={{
            backgroundColor: '#2A2237',
            borderColor: '#C9A24E',
            color: '#EBD28F',
            fontWeight: 800
          }}
        >
          <Globe size={15} color="#C9A24E" />
          <span>Public Customer Website</span>
        </button>

        {/* Global Search Bar */}
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#FAF8F5',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.45rem 0.85rem',
            color: 'var(--text-muted)',
            fontSize: '0.825rem',
            cursor: 'pointer',
            minWidth: '220px'
          }}
        >
          <Search size={15} color="var(--text-muted)" />
          <span style={{ flex: 1, textAlign: 'left' }}>Search customer, appointment...</span>
          <kbd style={{
            backgroundColor: '#E8E3DE',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.7rem',
            color: '#75707E',
            fontWeight: 700
          }}>
            ⌘K
          </kbd>
        </button>

        {/* Date Selector Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#FAF8F5',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.45rem 0.75rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--text-muted)'
        }}>
          <CalendarIcon size={14} color="var(--gold)" />
          <span>Today: 31 Aug 2026</span>
        </div>

        {/* Walk-in Dedicated Fast Button */}
        <button
          onClick={() => setIsWalkInOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{
            borderColor: 'var(--teal)',
            color: 'var(--teal)',
            backgroundColor: 'var(--teal-tint)',
            fontWeight: 700
          }}
        >
          <Scissors size={15} />
          <span>+ Walk-in</span>
        </button>

        {/* Global Quick Add Action */}
        <button
          onClick={() => setIsQuickActionOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Quick Add</span>
        </button>
      </div>
    </header>
  );
};
