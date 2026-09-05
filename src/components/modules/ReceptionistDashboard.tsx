import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { 
  Plus, 
  UserPlus, 
  Scissors, 
  Receipt, 
  Calendar, 
  Clock, 
  Search, 
  CheckCircle, 
  Phone,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ReceptionistDashboard: React.FC = () => {
  const { 
    appointments, 
    queue, 
    customers, 
    services, 
    staff,
    setIsAppointmentModalOpen, 
    setIsWalkInOpen,
    setIsInvoiceModalOpen,
    setActiveModule,
    addWalkInToQueue
  } = useSalon();

  const [selectedCustId, setSelectedCustId] = useState('');
  const [selectedSrvId, setSelectedSrvId] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [generatedToken, setGeneratedToken] = useState<any>(null);

  const handleGenerateWalkInToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustId || !selectedSrvId) return;

    addWalkInToQueue(selectedCustId, selectedSrvId, selectedStaffId || undefined);
    
    const cust = customers.find(c => c.id === selectedCustId);
    const srv = services.find(s => s.id === selectedSrvId);
    
    setGeneratedToken({
      tokenNumber: `#${Math.floor(Math.random() * 20 + 20)}`,
      customerName: cust?.name || 'Walk-in Guest',
      serviceName: srv?.name || 'Haircut',
      estimatedWait: '18 minutes'
    });
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* RECEPTION DECK PRIMARY ACTION BAR */}
      <div 
        className="luxury-card"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #121118 0%, #2A2436 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ backgroundColor: 'rgba(201, 162, 78, 0.2)', color: '#EBD28F', border: '1px solid #C9A24E', padding: '0.2rem 0.65rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 900 }}>
              🛎️ RECEPTION DESK OPERATING SYSTEM
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginTop: '0.3rem', margin: 0, color: '#FFFFFF' }}>
              Fast Reception Flow & Walk-in Token Engine
            </h2>
          </div>
        </div>

        {/* 4 PERSISTENT PRIMARY ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="champagne-btn-gold"
            style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <Calendar size={18} />
            <span>+ NEW APPOINTMENT</span>
          </button>

          <button
            onClick={() => setIsWalkInOpen(true)}
            className="champagne-btn-primary"
            style={{ padding: '0.85rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <Scissors size={18} color="#C9A24E" />
            <span>+ WALK-IN TOKEN</span>
          </button>

          <button
            onClick={() => setActiveModule('customers')}
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', color: '#121118', borderRadius: '12px', padding: '0.85rem 1rem', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <UserPlus size={18} color="#0E9C86" />
            <span>+ NEW CUSTOMER</span>
          </button>

          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            style={{ backgroundColor: '#0E9C86', color: '#FFFFFF', border: 'none', borderRadius: '12px', padding: '0.85rem 1rem', fontSize: '0.9rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
          >
            <Receipt size={18} />
            <span>CREATE BILL</span>
          </button>
        </div>
      </div>

      {/* QUICK WALK-IN TOKEN GENERATOR FORM & GENERATED TOKEN DISPLAY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.35rem' }}>
        {/* Token Generator Form */}
        <form 
          onSubmit={handleGenerateWalkInToken}
          className="luxury-card"
          style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#121118', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} color="#C9A24E" />
            <span>Instant Walk-in Token Generator</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463' }}>Select Customer</label>
            <select
              value={selectedCustId}
              onChange={(e) => setSelectedCustId(e.target.value)}
              required
              style={{ padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #E8E3DE', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FAF7F2' }}
            >
              <option value="">-- Choose Existing Customer --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463' }}>Select Service</label>
            <select
              value={selectedSrvId}
              onChange={(e) => setSelectedSrvId(e.target.value)}
              required
              style={{ padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #E8E3DE', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FAF7F2' }}
            >
              <option value="">-- Choose Service --</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} (₹{s.price})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5A5463' }}>Preferred Stylist (Optional)</label>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              style={{ padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #E8E3DE', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FAF7F2' }}
            >
              <option value="">Any Available Stylist</option>
              {staff.map(st => (
                <option key={st.id} value={st.id}>{st.name} ({st.role})</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="champagne-btn-gold"
            style={{ padding: '0.75rem', fontSize: '0.875rem', marginTop: '0.5rem', cursor: 'pointer' }}
          >
            Generate Queue Token Now
          </button>
        </form>

        {/* Generated Token Card Preview */}
        <div className="luxury-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem', backgroundColor: generatedToken ? '#121118' : '#FFFFFF', color: generatedToken ? '#FFFFFF' : '#121118' }}>
          {generatedToken ? (
            <>
              <span style={{ backgroundColor: '#C9A24E', color: '#121118', padding: '0.2rem 0.75rem', borderRadius: '99px', fontSize: '0.725rem', fontWeight: 900 }}>
                WALK-IN TOKEN GENERATED
              </span>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#EBD28F' }}>
                {generatedToken.tokenNumber}
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>{generatedToken.customerName}</div>
                <div style={{ fontSize: '0.85rem', color: '#A49EB0', marginTop: '0.15rem' }}>{generatedToken.serviceName}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(201, 162, 78, 0.4)', borderRadius: '12px', padding: '0.75rem 1.25rem', width: '100%' }}>
                <div style={{ fontSize: '0.725rem', color: '#A49EB0', fontWeight: 700 }}>ESTIMATED WAITING TIME</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0E9C86', marginTop: '0.2rem' }}>{generatedToken.estimatedWait}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                <button 
                  onClick={() => setActiveModule('queue')} 
                  className="champagne-btn-gold" 
                  style={{ flex: 1, padding: '0.55rem', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  View Live Queue
                </button>
                <button 
                  onClick={() => setGeneratedToken(null)} 
                  style={{ backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#FFFFFF', padding: '0.55rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Clear
                </button>
              </div>
            </>
          ) : (
            <>
              <Clock size={40} color="#C9A24E" />
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#5A5463' }}>
                Fill form to issue instant Walk-in token
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
