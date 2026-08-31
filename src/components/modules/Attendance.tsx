import React, { useState } from 'react';
import { useSalon } from '../../context/SalonContext';
import { Check, X, Plus } from 'lucide-react';

interface StaffAttendance {
  id: string;
  name: string;
  role: string;
  scheduled: string;
  status: 'Present' | 'Leave' | 'Absent' | 'Half Day';
  inTime: string;
  outTime: string;
  mark: 'P' | 'H' | 'L' | 'A';
  isOut?: boolean;
}

interface LeaveRequest {
  id: string;
  staff: string;
  dates: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface MonthSummary {
  staff: string;
  present: number;
  half: number;
  leave: number;
  absent: number;
  off: number;
  pct: string;
}

export const Attendance: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<StaffAttendance[]>([
    { id: '1', name: 'Chakradhar T.', role: 'Owner', scheduled: '10:00 AM – 7:00 PM', status: 'Present', inTime: '10:06 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '2', name: 'Kavya R.', role: 'Manager', scheduled: '10:00 AM – 7:00 PM', status: 'Present', inTime: '10:01 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '3', name: 'Nithya S.', role: 'Receptionist', scheduled: '10:00 AM – 7:00 PM', status: 'Present', inTime: '10:10 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '4', name: 'Arun', role: 'Stylist', scheduled: '10:00 AM – 9:00 PM', status: 'Present', inTime: '10:01 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '5', name: 'Meena', role: 'Stylist', scheduled: '11:00 AM – 9:00 PM', status: 'Present', inTime: '11:06 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '6', name: 'Sanjay', role: 'Barber', scheduled: '10:00 AM – 9:00 PM', status: 'Present', inTime: '10:07 AM', outTime: '—', mark: 'P', isOut: true },
    { id: '7', name: 'Priya', role: 'Therapist', scheduled: '10:00 AM – 8:00 PM', status: 'Leave', inTime: '—', outTime: '—', mark: 'L', isOut: false }
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'lr-1', staff: 'Priya', dates: '31 Aug', reason: 'Personal', status: 'Approved' },
    { id: 'lr-2', staff: 'Meena', dates: '3 Sep – 4 Sep', reason: 'Family function', status: 'Pending' },
    { id: 'lr-3', staff: 'Nithya S.', dates: '6 Sep', reason: 'Medical', status: 'Pending' }
  ]);

  const monthSummary: MonthSummary[] = [
    { staff: 'Chakradhar T.', present: 25, half: 0, leave: 0, absent: 0, off: 5, pct: '100%' },
    { staff: 'Kavya R.', present: 20, half: 1, leave: 2, absent: 2, off: 5, pct: '82%' },
    { staff: 'Nithya S.', present: 22, half: 0, leave: 3, absent: 0, off: 5, pct: '88%' },
    { staff: 'Arun', present: 22, half: 1, leave: 3, absent: 0, off: 4, pct: '87%' },
    { staff: 'Meena', present: 24, half: 1, leave: 0, absent: 1, off: 4, pct: '94%' },
    { staff: 'Sanjay', present: 21, half: 2, leave: 1, absent: 1, off: 5, pct: '88%' },
    { staff: 'Priya', present: 23, half: 2, leave: 1, absent: 0, off: 4, pct: '92%' }
  ];

  // 31-Day Register Heatmap Matrix
  const daysList = Array.from({ length: 30 }, (_, i) => String(i + 2).padStart(2, '0'));

  const registerMatrix: Record<string, string[]> = {
    'Chakradhar T.': ['P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P'],
    'Kavya R.':     ['P','P','P','P','P','A','P','P','P','P','P','A','P','P','P','P','P','P','P','L','P','P','A','P','P','P','P','P','P','P'],
    'Nithya S.':    ['P','P','A','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','A','P','P','A','P','P','P','P','P'],
    'Arun':         ['P','P','A','A','P','P','P','P','P','P','A','P','P','P','P','L','P','P','P','P','P','P','P','P','P','P','P','P','P','P'],
    'Meena':        ['P','P','L','A','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P']
  };

  const handleMarkChange = (id: string, newMark: 'P' | 'H' | 'L' | 'A') => {
    setAttendanceData(prev => prev.map(item => {
      if (item.id !== id) return item;
      const status = newMark === 'P' ? 'Present' : newMark === 'L' ? 'Leave' : newMark === 'A' ? 'Absent' : 'Half Day';
      return { ...item, mark: newMark, status, inTime: newMark === 'P' ? '10:05 AM' : '—' };
    }));
  };

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: action } : l));
  };

  return (
    <div className="workspace-padding" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#FAF8F5', minHeight: '100vh', color: '#1E1A25', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14121A', letterSpacing: '-0.02em' }}>
          Attendance management
        </h2>
        <p style={{ color: '#75707E', fontSize: '0.85rem', marginTop: '0.15rem' }}>
          Mark today's attendance, review the month, approve leave
        </p>
      </div>

      {/* TOP SECTION: TODAY · MON, 31 AUG TABLE */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          TODAY · MON, 31 AUG
        </div>

        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>ROLE</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>SCHEDULED</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STATUS</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>IN</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>OUT</th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.725rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>MARK</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                  {/* STAFF */}
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#14121A' }}>
                    {row.name}
                  </td>

                  {/* ROLE */}
                  <td style={{ padding: '0.75rem 1rem', color: '#75707E' }}>
                    {row.role}
                  </td>

                  {/* SCHEDULED */}
                  <td style={{ padding: '0.75rem 1rem', color: '#14121A' }}>
                    {row.scheduled}
                  </td>

                  {/* STATUS */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {row.status === 'Present' ? (
                      <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Present
                      </span>
                    ) : (
                      <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                        Leave
                      </span>
                    )}
                  </td>

                  {/* IN */}
                  <td style={{ padding: '0.75rem 1rem', color: '#14121A' }}>
                    {row.inTime}
                  </td>

                  {/* OUT */}
                  <td style={{ padding: '0.75rem 1rem', color: '#75707E' }}>
                    {row.outTime}
                  </td>

                  {/* MARK & OUT ACTION */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {/* P H L A Pill Selector */}
                      <div style={{ display: 'flex', backgroundColor: '#FAF8F5', border: '1px solid #E8E3DE', borderRadius: '6px', padding: '0.15rem' }}>
                        {(['P', 'H', 'L', 'A'] as const).map(letter => {
                          const isActive = row.mark === letter;
                          return (
                            <button
                              key={letter}
                              onClick={() => handleMarkChange(row.id, letter)}
                              style={{
                                width: '24px',
                                height: '24px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: isActive ? '#C9A24E' : 'transparent',
                                color: isActive ? '#14121A' : '#75707E',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {letter}
                            </button>
                          );
                        })}
                      </div>

                      {/* OUT BUTTON */}
                      {row.isOut && (
                        <button
                          style={{
                            backgroundColor: '#0E9C86',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.25rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          Out
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MIDDLE SECTION: 2 COLUMNS (LEAVE REQUESTS & MONTH SUMMARY) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* LEFT: LEAVE REQUESTS */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            LEAVE REQUESTS
          </div>

          <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>DATES</th>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>REASON</th>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STATUS</th>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>{req.staff}</td>
                    <td style={{ padding: '0.65rem 0.85rem', color: '#75707E' }}>{req.dates}</td>
                    <td style={{ padding: '0.65rem 0.85rem', color: '#14121A' }}>{req.reason}</td>
                    <td style={{ padding: '0.65rem 0.85rem' }}>
                      {req.status === 'Approved' && (
                        <span style={{ backgroundColor: '#DDF4EF', color: '#0E9C86', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                          Approved
                        </span>
                      )}
                      {req.status === 'Pending' && (
                        <span style={{ backgroundColor: '#FBEFD8', color: '#C57A0F', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                          Pending
                        </span>
                      )}
                      {req.status === 'Rejected' && (
                        <span style={{ backgroundColor: '#FBE5E1', color: '#D9584A', fontSize: '0.675rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                          Rejected
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>
                      {req.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleLeaveAction(req.id, 'Approved')}
                            style={{ backgroundColor: '#0E9C86', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '0.25rem 0.55rem', fontSize: '0.725rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveAction(req.id, 'Rejected')}
                            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '6px', padding: '0.25rem 0.55rem', fontSize: '0.725rem', fontWeight: 800, color: '#14121A', cursor: 'pointer' }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#75707E' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8E3DE',
              borderRadius: '8px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#14121A',
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
          >
            + Leave request
          </button>
        </div>

        {/* RIGHT: MONTH SUMMARY · 2026-08 */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            MONTH SUMMARY · 2026-08
          </div>

          <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left' }}>STAFF</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>PRESENT</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>HALF</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>LEAVE</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>ABSENT</th>
                  <th style={{ padding: '0.65rem 0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'center' }}>OFF</th>
                  <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'right' }}>ATTENDANCE %</th>
                </tr>
              </thead>
              <tbody>
                {monthSummary.map((sum, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #E8E3DE' }}>
                    <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A' }}>{sum.staff}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#14121A' }}>{sum.present}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>{sum.half}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>{sum.leave}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>{sum.absent}</td>
                    <td style={{ padding: '0.65rem 0.5rem', textAlign: 'center', color: '#75707E' }}>{sum.off}</td>
                    <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right', fontWeight: 800, color: '#14121A' }}>{sum.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: REGISTER · 2026-08 (31-DAY ATTENDANCE HEATMAP GRID) */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8E3DE', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          REGISTER · 2026-08
        </div>

        <div className="table-container" style={{ border: '1px solid #E8E3DE', borderRadius: '12px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF8F5', borderBottom: '1px solid #E8E3DE' }}>
                <th style={{ padding: '0.65rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, color: '#75707E', textTransform: 'uppercase', textAlign: 'left', position: 'sticky', left: 0, backgroundColor: '#FAF8F5' }}>STAFF</th>
                {daysList.map(day => (
                  <th key={day} style={{ padding: '0.65rem 0.25rem', fontSize: '0.7rem', fontWeight: 700, color: '#75707E', textAlign: 'center', minWidth: '24px' }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(registerMatrix).map(([staffName, dots]) => (
                <tr key={staffName} style={{ borderBottom: '1px solid #E8E3DE' }}>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#14121A', whiteSpace: 'nowrap' }}>
                    {staffName}
                  </td>
                  {dots.map((val, idx) => {
                    const dotColor = val === 'P' ? '#0E9C86' : val === 'A' ? '#D9584A' : val === 'L' ? '#C57A0F' : '#E8E3DE';
                    return (
                      <td key={idx} style={{ padding: '0.65rem 0.25rem', textAlign: 'center' }}>
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: dotColor,
                            margin: '0 auto'
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
