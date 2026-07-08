import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Interfaces ---
interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  time?: string;
  type: 'Release' | 'Meeting' | 'Production';
}

interface Objective {
  id: string;
  title: string;
  points: React.ReactNode[]; // Updated to support JSX tags like <br /> and <strong>
}

interface DirectoryItem {
  id: string;
  name: string;
  driveUrl?: string; // Made optional so parent folders don't throw an error!
  previewUrl?: string;
  description: string;
  subItems?: DirectoryItem[]; // Supports nested items
}

interface DirectorySection {
  category: string;
  icon: string;
  items: DirectoryItem[];
}

// --- TEAM CONTACT DIRECTORY ---
const EBF_TEAM_CONTACTS: Record<string, { phone: string, gateway: string }> = {
  Frank: { phone: '2015093876', gateway: 'vtext.com' },     // Verizon
  EJ: { phone: '2013034319', gateway: 'txt.att.net' }  // AT&T
};

export default function Dashboard() {
  const navigate = useNavigate();
  // const TUNNEL_URL = window.location.origin; ORIGINAL DEF
    const TUNNEL_URL = '';

  const [isFoldersOpen, setIsFoldersOpen] = useState(true);

  // --- Theme State ---
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // --- Interactive Calendar State ---
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 6, 4)); // July 2026
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-07-04');
  
  // --- UI Sections State ---
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(true);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState<boolean>(true);
  const [expandedPreviews, setExpandedPreviews] = useState<Record<string, boolean>>({});

  const togglePreview = (id: string) => {
    setExpandedPreviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- PRESERVED AUTO-LOCK SECURITY LOGIC ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userToken');
        sessionStorage.clear();
        navigate('/login');
        
        fetch(`${TUNNEL_URL}/api/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'auto_lock_triggered', time: new Date().toISOString() }),
        }).catch((err) => console.error("Log error:", err));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [navigate, TUNNEL_URL]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    navigate('/login');
  };

  // --- TEXT DISPATCHER FUNCTION ---
  const handleSendReminder = async (teamMember: string, taskName: string) => {
    const contact = EBF_TEAM_CONTACTS[teamMember];
    
    if (!contact) {
      alert(`Could not find contact info for ${teamMember}`);
      return;
    }

    try {
      const response = await fetch(`${TUNNEL_URL}/api/send-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: contact.phone,
          carrierGateway: contact.gateway,
          message: `COMMAND CENTER ALERT: ${teamMember}, update pending for "${taskName}"`
        })
      });

      if (response.ok) {
        alert(`Text reminder successfully sent to ${teamMember}!`);
      } else {
        alert("Server failed to send text.");
      }
    } catch (error) {
      console.error("Error dispatching text:", error);
    }
  };

  // --- CALENDAR EVENTS ---
  const calendarEvents: CalendarEvent[] = [
    { id: 'evt-1', date: '2026-07-04', title: 'Payroll Operations Establishment', time: '12:00 PM', type: 'Production' },
    { id: 'evt-2', date: '2026-07-10', title: 'Media Asset Sync & Deck Review', time: '2:00 PM', type: 'Meeting' },
    { id: 'evt-3', date: '2026-07-24', title: 'Stems & Mix Approvals ("Shaq & Kobe Mode")', time: '11:00 AM', type: 'Production' },
    { id: 'evt-4', date: '2026-08-01', title: 'Official Q3 Single Launch Campaign Drop', time: '12:00 AM', type: 'Release' }
  ];

  // --- DELIVERABLES / OBJECTIVES ---
  const companyObjectives: Objective[] = [
    {
      id: 'obj-1',
      title: 'Payroll',
      points: [
        <><strong>7/4, 7/10 - Establishment of Payroll Ops for EBF Holdings <br /> (Deliverable Delegation: <span style={{ color: 'blue' }}>EJ</span>) </strong></>
      ]
    },
    {
      id: 'obj-2',
      title: 'EBF Holdings Dashboard',
      points: [
        <><strong>7/3, Ongoing - Start up the navigational dashboard that links to targeted Google Drive Folders <br /><span style={{ color: 'blue' }}>Frank</span> </strong></>,
        <>2026 - Increase mobile data access for EBF Holdings staff by 100% such that accessibility will be measured by speed <br />(Deliverable Delegation: Frank)</>,
        <>Create EBF Holdings flowchart to visualize corporation structure <br />(Deliverable Delegation: Frank)</>
      ]
    },
    {
      id: 'obj-3',
      title: 'ECI Deliverables',
      points: [
        <>7/3, 7/10 - Begin 1st draft of Cleaning Company app<br />Price quote based on an AR or camera based interface <br />(Deliverable Delegation: Frank)</>
      ]
    }
  ];

  // --- DIRECTORY DATA ---
  const directoryData: DirectorySection[] = [
    {
      category: "ECI",
      icon: "📁",
      items: [
        {
          id: "subsidiaries",
          name: "Investments",
          description: "ECIs Current & Incoming Assets", 
          subItems: [
            {
              id: "cleaning",
              name: "Cleaning",
              description: "Cleaning company to be named",
              previewUrl: ""
            },
            {
              id: "cloudKitchen",
              name: "Cloud Kitchen Startup",
              description: "Cloud kithcen startup that will function solely with delivery ticketed items",
              previewUrl: ""
            },
            {
              id: "real estate",
              name: "Realty Business",
              description: "Buy low sell high - style Realty business mainly in rural PA",
              previewUrl: ""
            },
            {
              id: "home",
              name: "Home Health Aide",
              description: "A Licesned company in the business of providing home aide to the disabled",
              previewUrl: ""
            }
          ]
        }
      ]
    },
    {
      category: "EMP",
      icon: "📁",
      items: [
        {
          id: "ebf-artists",
          name: "EBF Artists Collective",
          description: "Photoshoots & More",
          subItems: [
            {
              id: "audio-stems",
              name: "XL-Lounge",
              driveUrl: "https://drive.google.com/drive/folders/1NwgyoZUG8rCXEhPGHrv6JgwY_Ey75hyR?usp=sharing",
              previewUrl: "/img/XL_Prev.JPG",
              description: "EBF Opening for Bleu"
            },
            {
              id: "artwork-promo",
              name: "YouWithUs Cypher",
              driveUrl: "https://drive.google.com/drive/folders/19zFr8u3za8rUhoYQt4m-4Eumn1AHv2t5?usp=sharing",
              previewUrl: "/img/CYPHER.JPG",
              description: "Cypher with co artists and YouWithUs company"
            }
          ]
        },
        {
          id: "build",
          name: "LETS BUILD",
          description: "Build section for upcoming works"
        }  
      ]
    }
  ];

  // --- CALENDAR LOGIC ENGINE ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const activeDayEvents = calendarEvents.filter(evt => evt.date === selectedDateStr);

  // --- THEME DICTIONARY ---
  const t = {
    bg: isDarkMode ? '#000000' : '#F5F5F7',
    text: isDarkMode ? '#FFFFFF' : '#111111',
    textMuted: isDarkMode ? '#888888' : '#555555',
    textSubtle: isDarkMode ? '#555555' : '#888888',
    cardOut: isDarkMode ? '#050505' : '#FFFFFF',
    cardIn: isDarkMode ? '#0a0a0a' : '#FAFAFA',
    borderHard: isDarkMode ? '#1a1a1a' : '#E0E0E0',
    borderSoft: isDarkMode ? '#111111' : '#EEEEEE',
    borderActive: isDarkMode ? '#333333' : '#CCCCCC',
    red: '#D32F2F',
    blue: '#00E5FF',
    yellow: '#FFC107'
  };

  return (
    <div style={{ backgroundColor: t.bg, color: t.text, minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', transition: 'background-color 0.3s, color 0.3s' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.borderSoft}`, paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', letterSpacing: '0.05em', margin: 0 }}>
            COMMAND CENTER
          </h1>
          <p style={{ color: t.textMuted, fontSize: '0.875rem', marginTop: '0.25rem' }}>Strategic Company Objectives & Core Operations</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ backgroundColor: 'transparent', border: `1px solid ${t.borderHard}`, color: t.text, padding: '0.5rem', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Toggle Light/Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: 'transparent', border: `1px solid ${t.red}`, color: t.red, padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', fontWeight: '600' }}
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {/* SECTION 1: INTERACTIVE CALENDAR ENGINE */}
        <section style={{ border: `1px solid ${t.borderHard}`, backgroundColor: t.cardOut, borderRadius: '6px', padding: '1.5rem' }}>
          <div 
            onClick={() => setIsCalendarOpen(!isCalendarOpen)} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', marginBottom: isCalendarOpen ? '1.5rem' : '0' }}
          >
            <span style={{ color: t.red, fontSize: '0.75rem', transform: isCalendarOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▶</span>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '0.05em', color: t.text, margin: 0, fontWeight: '700' }}>SCHEDULE & TIMELINES</h2>
          </div>

          {isCalendarOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', color: t.red, cursor: 'pointer', fontSize: '1rem' }}>◀</button>
                  <span style={{ fontWeight: '700', letterSpacing: '0.1em', fontSize: '0.95rem' }}>{monthNames[month]} {year}</span>
                  <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', color: t.red, cursor: 'pointer', fontSize: '1rem' }}>▶</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textTransform: 'uppercase', fontSize: '0.7rem', color: t.textMuted, textAlign: 'center', marginBottom: '0.5rem', fontWeight: '700' }}>
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  {daysArray.map((day, idx) => {
                    if (day === null) return <div key={`empty-${idx}`} />;
                    const padDay = String(day).padStart(2, '0');
                    const padMonth = String(month + 1).padStart(2, '0');
                    const dateStr = `${year}-${padMonth}-${padDay}`;
                    const hasEvent = calendarEvents.some(e => e.date === dateStr);
                    const isSelected = selectedDateStr === dateStr;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDateStr(dateStr)}
                        style={{
                          backgroundColor: isSelected ? t.red : t.cardIn,
                          color: isSelected ? '#FFF' : t.text,
                          border: hasEvent && !isSelected ? `1px solid ${t.borderActive}` : `1px solid ${t.borderSoft}`,
                          padding: '0.6rem 0',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          borderRadius: '3px',
                          position: 'relative',
                          fontWeight: hasEvent ? '700' : '400',
                          transition: '0.1s'
                        }}
                      >
                        {day}
                        {hasEvent && !isSelected && (
                          <span style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', backgroundColor: t.red, borderRadius: '50%' }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ borderLeft: `1px solid ${t.borderSoft}`, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '0.9rem', color: t.textMuted, letterSpacing: '0.05em' }}>AGENDA // {selectedDateStr}</h3>
                {activeDayEvents.length === 0 ? (
                  <p style={{ color: t.textSubtle, fontSize: '0.85rem', margin: 0 }}>No scheduled events for this block.</p>
                ) : (
                  activeDayEvents.map(evt => (
                    <div key={evt.id} style={{ backgroundColor: t.cardIn, border: `1px solid ${t.borderHard}`, borderRadius: '4px', padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                        <span style={{ color: evt.type === 'Release' ? t.red : evt.type === 'Meeting' ? t.blue : t.yellow, fontWeight: '700' }}>{evt.type.toUpperCase()}</span>
                        {evt.time && <span style={{ color: t.textMuted }}>{evt.time}</span>}
                      </div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', color: t.text, fontWeight: '600' }}>{evt.title}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: CLEAN DELIVERABLES (COLLAPSIBLE) */}
        <section style={{ border: `1px solid ${t.borderHard}`, backgroundColor: t.cardOut, borderRadius: '6px', padding: '1.5rem' }}>
          <div 
            onClick={() => setIsObjectivesOpen(!isObjectivesOpen)} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', marginBottom: isObjectivesOpen ? '1.5rem' : '0' }}
          >
            <span style={{ color: t.red, fontSize: '0.75rem', transform: isObjectivesOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▶</span>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '0.05em', color: t.red, margin: 0, fontWeight: '700' }}>DELIVERABLES</h2>
          </div>

          {isObjectivesOpen && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {companyObjectives.map((obj) => (
                <div key={obj.id} style={{ backgroundColor: t.cardIn, border: `1px solid ${t.borderHard}`, padding: '1.5rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div>
                    <h3 style={{ fontSize: '1.05rem', margin: '0 0 1rem 0', fontWeight: '600', color: t.text }}>{obj.title}</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: t.textMuted, fontSize: '0.85rem', lineHeight: '1.6' }}>
                      {obj.points.map((point, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* NEW: Quick-Ping Button */}
                  <div style={{ marginTop: '1.5rem', borderTop: `1px solid ${t.borderHard}`, paddingTop: '1rem' }}>
                    <button 
                      // Simple check to ping EJ if it's the Payroll objective, otherwise default to Frank
                      onClick={() => handleSendReminder(obj.title === 'Payroll' ? 'EJ' : 'Frank', obj.title)} 
                      style={{ backgroundColor: 'transparent', border: `1px solid ${t.blue}`, color: t.blue, padding: '0.4rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '3px', fontWeight: '600', width: '100%' }}
                    >
                      Ping Team Member 💬
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 3: RESOURCE DIRECTORY (COLLAPSIBLE) */}
        <section style={{ border: `1px solid ${t.borderHard}`, backgroundColor: t.cardOut, borderRadius: '6px', padding: '1.5rem' }}>
          <div 
            onClick={() => setIsFoldersOpen(!isFoldersOpen)} 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none', marginBottom: isFoldersOpen ? '1.5rem' : '0' }}
          >
            <span style={{ color: t.text, fontSize: '0.75rem', transform: isFoldersOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▶</span>
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '0.05em', color: t.text, margin: 0, fontWeight: '700' }}>EBF HOLDINGS DIRECTORY</h2>
          </div>

          {isFoldersOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {directoryData.map((section, sIdx) => (
                <div key={sIdx} style={{ backgroundColor: t.cardIn, border: `1px solid ${t.borderHard}`, borderRadius: '6px', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: `1px solid ${t.borderHard}`, paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{section.icon}</span>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: t.text }}>{section.category}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {section.items.map((item) => (
                      <div key={item.id} style={{ border: `1px solid ${t.borderHard}`, backgroundColor: t.cardOut, borderRadius: '4px', padding: '1rem' }}>
                        
                        {/* Parent Item details */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: t.text }}>{item.name}</h4>
                            <p style={{ margin: '0.25rem 0 0 0', color: t.textMuted, fontSize: '0.8rem' }}>{item.description}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {item.previewUrl && (
                              <button onClick={() => togglePreview(item.id)} style={{ backgroundColor: t.cardIn, border: `1px solid ${t.borderHard}`, color: t.textMuted, padding: '0.4rem 0.8rem', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '3px' }}>
                                {expandedPreviews[item.id] ? 'Hide Preview' : 'Preview'}
                              </button>
                            )}
                            {item.driveUrl && (
                              <a href={item.driveUrl} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: t.red, color: '#FFF', padding: '0.4rem 0.8rem', fontSize: '0.75rem', textDecoration: 'none', borderRadius: '3px', fontWeight: '600' }}>
                                Open Drive ↗
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Preview Image display */}
                        {expandedPreviews[item.id] && item.previewUrl && (
                          <div style={{ marginTop: '1rem', borderTop: `1px solid ${t.borderHard}`, paddingTop: '1rem', display: 'flex', justifyContent: 'center', backgroundColor: t.bg }}>
                            <img src={item.previewUrl} alt={`${item.name} preview`} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: `1px solid ${t.borderSoft}` }} />
                          </div>
                        )}

                        {/* Logic to display Nested Sub-Items */}
                        {item.subItems && item.subItems.length > 0 && (
                          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px dashed ${t.borderHard}`, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
                            {item.subItems.map((subItem) => (
                              <div key={subItem.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: t.cardIn, padding: '0.75rem', borderRadius: '4px', border: `1px solid ${t.borderSoft}` }}>
                                <div>
                                  <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: t.text }}>↳ {subItem.name}</h5>
                                  <p style={{ margin: '0.2rem 0 0 0', color: t.textMuted, fontSize: '0.75rem' }}>{subItem.description}</p>
                                </div>
                                {subItem.driveUrl && (
                                  <a href={subItem.driveUrl} target="_blank" rel="noopener noreferrer" style={{ color: t.red, fontSize: '0.75rem', textDecoration: 'none', fontWeight: '600' }}>
                                    Drive ↗
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}