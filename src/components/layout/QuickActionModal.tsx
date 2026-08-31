import React from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Calendar, 
  Scissors, 
  UserPlus, 
  Receipt, 
  Wallet, 
  Package, 
  X 
} from 'lucide-react';

export const QuickActionModal: React.FC = () => {
  const { 
    isQuickActionOpen, 
    setIsQuickActionOpen, 
    setIsWalkInOpen,
    setIsAppointmentModalOpen,
    setIsInvoiceModalOpen,
    setActiveModule 
  } = useSalon();

  if (!isQuickActionOpen) return null;

  const actions = [
    {
      id: 'walkin',
      title: 'Walk-in Customer',
      desc: 'Add walk-in directly to live queue (#3 in queue)',
      icon: Scissors,
      color: '#10b981',
      action: () => {
        setIsQuickActionOpen(false);
        setIsWalkInOpen(true);
      }
    },
    {
      id: 'appointment',
      title: 'New Appointment',
      desc: 'Book slot with staff, service & time selection',
      icon: Calendar,
      color: '#6366f1',
      action: () => {
        setIsQuickActionOpen(false);
        setIsAppointmentModalOpen(true);
      }
    },
    {
      id: 'invoice',
      title: 'Create Invoice',
      desc: 'Quick POS cashier checkout & receipt printing',
      icon: Receipt,
      color: '#f59e0b',
      action: () => {
        setIsQuickActionOpen(false);
        setActiveModule('billing');
      }
    },
    {
      id: 'customer',
      title: 'New Customer',
      desc: 'Register customer into CRM with preferences',
      icon: UserPlus,
      color: '#0ea5e9',
      action: () => {
        setIsQuickActionOpen(false);
        setActiveModule('customers');
      }
    },
    {
      id: 'expense',
      title: 'Add Expense',
      desc: 'Log rent, inventory, or utility expense',
      icon: Wallet,
      color: '#f43f5e',
      action: () => {
        setIsQuickActionOpen(false);
        setActiveModule('expenses');
      }
    },
    {
      id: 'stock',
      title: 'Add / Restock Inventory',
      desc: 'Update product stock levels & min threshold',
      icon: Package,
      color: '#8b5cf6',
      action: () => {
        setIsQuickActionOpen(false);
        setActiveModule('inventory');
      }
    }
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsQuickActionOpen(false)}>
      <div 
        className="modal-card" 
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div className="modal-header">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quick Actions OS Launcher</h3>
          <button 
            onClick={() => setIsQuickActionOpen(false)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.25rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem'
          }}>
            {actions.map(act => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={act.action}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = act.color;
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: `${act.color}20`,
                    border: `1px solid ${act.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color={act.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {act.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
