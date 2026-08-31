import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { NavModule } from '../../types';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Users, 
  Grid, 
  Scissors, 
  UserCheck, 
  Receipt, 
  Package, 
  Wallet, 
  Megaphone, 
  BarChart3, 
  Settings,
  X 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeModule, setActiveModule, setIsWalkInOpen } = useSalon();
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);

  const mainTabs = [
    { id: 'dashboard' as NavModule, label: 'Home', icon: LayoutDashboard },
    { id: 'appointments' as NavModule, label: 'Appts', icon: Calendar },
    { id: 'queue' as NavModule, label: 'Queue', icon: Clock },
    { id: 'customers' as NavModule, label: 'Customers', icon: Users },
  ];

  const moreItems = [
    { id: 'services' as NavModule, label: 'Services & Pricing', icon: Scissors },
    { id: 'staff' as NavModule, label: 'Staff Roster', icon: UserCheck },
    { id: 'billing' as NavModule, label: 'Billing / POS', icon: Receipt },
    { id: 'inventory' as NavModule, label: 'Inventory', icon: Package },
    { id: 'expenses' as NavModule, label: 'Expenses', icon: Wallet },
    { id: 'marketing' as NavModule, label: 'Marketing', icon: Megaphone },
    { id: 'reports' as NavModule, label: 'Reports', icon: BarChart3 },
    { id: 'settings' as NavModule, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#090d16',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        padding: '0 0.5rem'
      }}>
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveModule(tab.id);
                setIsMoreSheetOpen(false);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                background: 'transparent',
                border: 'none',
                color: isActive ? 'var(--primary-500)' : 'var(--text-muted)',
                fontSize: '0.7rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                flex: 1
              }}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* Floating Quick Walk-In / Add Launcher Button */}
        <button
          onClick={() => setIsWalkInOpen(true)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            cursor: 'pointer',
            marginTop: '-16px'
          }}
          title="Walk-in Customer"
        >
          <Scissors size={22} />
        </button>

        {/* More Button */}
        <button
          onClick={() => setIsMoreSheetOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.2rem',
            background: 'transparent',
            border: 'none',
            color: isMoreSheetOpen ? 'var(--primary-500)' : 'var(--text-muted)',
            fontSize: '0.7rem',
            fontWeight: 500,
            cursor: 'pointer',
            flex: 1
          }}
        >
          <Grid size={20} />
          <span>More</span>
        </button>
      </div>

      {/* More Bottom Sheet Drawer */}
      {isMoreSheetOpen && (
        <div 
          onClick={() => setIsMoreSheetOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 13, 22, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderTopLeftRadius: 'var(--radius-xl)',
              borderTopRightRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              borderTop: '1px solid var(--border-strong)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>All Salon OS Modules</h3>
              <button 
                onClick={() => setIsMoreSheetOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {moreItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setIsMoreSheetOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      color: 'var(--text-main)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={20} color="var(--primary-500)" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
