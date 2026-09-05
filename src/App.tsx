import React from 'react';
import { useSalon, SalonProvider } from './context/SalonContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { QuickActionModal } from './components/layout/QuickActionModal';
import { StylistRequestAlert } from './components/common/StylistRequestAlert';

import { Dashboard } from './components/modules/Dashboard';
import { OwnerDashboard } from './components/modules/OwnerDashboard';
import { ManagerDashboard } from './components/modules/ManagerDashboard';
import { ReceptionistDashboard } from './components/modules/ReceptionistDashboard';
import { StylistDashboard } from './components/modules/StylistDashboard';

import { MISDashboard } from './components/modules/MISDashboard';
import { Appointments } from './components/modules/Appointments';
import { LiveQueue } from './components/modules/LiveQueue';
import { QueueControl } from './components/modules/QueueControl';
import { Customers } from './components/modules/Customers';
import { Services } from './components/modules/Services';
import { Staff } from './components/modules/Staff';
import { BillingPOS } from './components/modules/BillingPOS';
import { Inventory } from './components/modules/Inventory';
import { Invoices } from './components/modules/Invoices';
import { Attendance } from './components/modules/Attendance';
import { Payroll } from './components/modules/Payroll';
import { Commissions } from './components/modules/Commissions';
import { Expenses } from './components/modules/Expenses';
import { Marketing } from './components/modules/Marketing';
import { Reports } from './components/modules/Reports';
import { ServicesConfig } from './components/modules/ServicesConfig';
import { CustomerWebsiteConfig } from './components/modules/CustomerWebsiteConfig';
import { BookingTokenRules } from './components/modules/BookingTokenRules';
import { NotificationsCenter } from './components/modules/NotificationsCenter';
import { Settings } from './components/modules/Settings';
import { CustomerProfile } from './components/modules/CustomerProfile';
import { InvoiceModal } from './components/modules/InvoiceModal';

import { CustomerApp } from './components/customer/CustomerApp';

const AdminLayout: React.FC = () => {
  const { activeModule, activeRole, hasModulePermission, setActiveModule, activeCustomerProfileId, setActiveCustomerProfileId, activeInvoicePreview, setActiveInvoicePreview } = useSalon();

  const renderDashboardByRole = () => {
    switch (activeRole) {
      case 'owner': return <OwnerDashboard />;
      case 'manager': return <ManagerDashboard />;
      case 'receptionist': return <ReceptionistDashboard />;
      case 'stylist': return <StylistDashboard />;
      default: return <OwnerDashboard />;
    }
  };

  const renderModule = () => {
    if (activeModule !== 'dashboard' && !hasModulePermission(activeModule)) {
      return (
        <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: '#FFF9EE', border: '1.5px solid #C9A24E', borderRadius: '20px', padding: '2.5rem 2rem', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#121118', color: '#EBD28F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900 }}>
              🔒
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#121118', margin: 0 }}>Module Access Restricted</h3>
              <p style={{ fontSize: '0.85rem', color: '#5A5463', marginTop: '0.35rem', margin: 0, lineHeight: 1.45 }}>
                Access to <strong>{activeModule}</strong> has been disabled for the <strong>{activeRole.toUpperCase()}</strong> role by your Salon Owner or Manager.
              </p>
            </div>
            <button 
              onClick={() => setActiveModule('dashboard')} 
              className="champagne-btn-gold" 
              style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              Return to Role Dashboard
            </button>
          </div>
        </div>
      );
    }

    switch (activeModule) {
      case 'dashboard': return renderDashboardByRole();
      case 'ai_insights': return <OwnerDashboard />;
      case 'mis_dashboard': return <MISDashboard />;
      case 'appointments': return <Appointments />;
      case 'queue': return <LiveQueue />;
      case 'queue_control': return <QueueControl />;
      case 'customers': return <Customers />;
      case 'services': return <Services />;
      case 'staff': return <Staff />;
      case 'billing': return <BillingPOS />;
      case 'inventory': return <Invoices />;
      case 'attendance': return <Attendance />;
      case 'payroll': return <Payroll />;
      case 'commissions': return <Commissions />;
      case 'expenses': return <Expenses />;
      case 'marketing': return <Marketing />;
      case 'reports': return <Reports />;
      case 'services_config': return <ServicesConfig />;
      case 'customer_website': return <CustomerWebsiteConfig />;
      case 'booking_rules': return <BookingTokenRules />;
      case 'settings': return <Settings />;
      
      // Role Specific Modules
      case 'walkins': return <ReceptionistDashboard />;
      case 'payments': return <Invoices />;
      case 'complaints': return <ManagerDashboard />;
      case 'branches': return <Settings />;
      case 'memberships': return <CustomerWebsiteConfig />;
      case 'finance': return <Expenses />;
      case 'my_day': return <StylistDashboard />;
      case 'my_appointments': return <Appointments />;
      case 'my_queue': return <LiveQueue />;
      case 'service_history': return <LiveQueue />;
      case 'my_commission': return <Commissions />;
      case 'my_profile': return <Staff />;

      default: return renderDashboardByRole();
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}>
      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '70px' }}>
        <TopBar />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderModule()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <QuickActionModal />
      {activeCustomerProfileId && <CustomerProfile customerId={activeCustomerProfileId} onClose={() => setActiveCustomerProfileId(null)} />}
      {activeInvoicePreview && <InvoiceModal invoice={activeInvoicePreview} onClose={() => setActiveInvoicePreview(null)} />}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { viewPerspective } = useSalon();

  return (
    <>
      {viewPerspective === 'customer' ? <CustomerApp /> : <AdminLayout />}
      <StylistRequestAlert />
    </>
  );
};

export default function App() {
  return (
    <SalonProvider>
      <AppContent />
    </SalonProvider>
  );
}
