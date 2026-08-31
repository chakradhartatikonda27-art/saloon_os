import React from 'react';
import { useSalon, SalonProvider } from './context/SalonContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { QuickActionModal } from './components/layout/QuickActionModal';
import { StylistRequestAlert } from './components/common/StylistRequestAlert';

import { Dashboard } from './components/modules/Dashboard';
import { MISDashboard } from './components/modules/MISDashboard';
import { Appointments } from './components/modules/Appointments';
import { LiveQueue } from './components/modules/LiveQueue';
import { Customers } from './components/modules/Customers';
import { Services } from './components/modules/Services';
import { Staff } from './components/modules/Staff';
import { BillingPOS } from './components/modules/BillingPOS';
import { Inventory } from './components/modules/Inventory';
import { Expenses } from './components/modules/Expenses';
import { Marketing } from './components/modules/Marketing';
import { Reports } from './components/modules/Reports';
import { NotificationsCenter } from './components/modules/NotificationsCenter';
import { Settings } from './components/modules/Settings';
import { CustomerProfile } from './components/modules/CustomerProfile';
import { InvoiceModal } from './components/modules/InvoiceModal';

import { CustomerApp } from './components/customer/CustomerApp';

const AdminLayout: React.FC = () => {
  const { activeModule, activeCustomerProfileId, setActiveCustomerProfileId, activeInvoicePreview, setActiveInvoicePreview } = useSalon();

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'mis_dashboard': return <MISDashboard />;
      case 'appointments': return <Appointments />;
      case 'queue': return <LiveQueue />;
      case 'customers': return <Customers />;
      case 'services': return <Services />;
      case 'staff': return <Staff />;
      case 'billing': return <BillingPOS />;
      case 'inventory': return <Inventory />;
      case 'expenses': return <Expenses />;
      case 'marketing': return <Marketing />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
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

export function App() {
  return (
    <SalonProvider>
      <AppContent />
    </SalonProvider>
  );
}

export default App;
