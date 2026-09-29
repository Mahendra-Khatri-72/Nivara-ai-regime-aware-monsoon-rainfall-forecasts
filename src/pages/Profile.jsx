import { Menu, MapPin, Bell, Settings, Info, HelpCircle, LogOut, ChevronRight, User } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { icon: MapPin, label: 'My Locations', sub: 'Manage saved places' },
    { icon: Bell, label: 'Notifications', sub: 'Weather alerts & updates', badge: '3' },
    { icon: Settings, label: 'App Settings', sub: 'Theme, units, language' },
    { icon: Info, label: 'About Nivara', sub: 'Version 1.0.0' },
    { icon: HelpCircle, label: 'Help & Support', sub: 'Contact us' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '2rem' }}>
      
      {/* Header */}
      <header className="app-header" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
          <Menu size={26} color="#111827" />
        </button>
      </header>

      {/* User Info Section */}
      <div className="flex-row gap-4 mb-4 px-2" style={{ padding: '0 1rem 1.5rem 1rem' }}>
        <div style={{ 
          width: 72, height: 72, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #00d29b, #064e3b)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: 'white',
          boxShadow: '0 8px 16px rgba(0, 210, 155, 0.2)'
        }}>
          <User size={36} color="white" />
        </div>
        <div>
          <div className="text-sm" style={{ color: '#0369a1', fontWeight: 600, marginBottom: '2px' }}>Hello,</div>
          <h2 style={{ fontSize: '1.4rem', color: '#111827', fontWeight: 700, letterSpacing: '-0.5px' }}>Mahendra</h2>
          <div className="text-xs text-muted" style={{ fontWeight: 500, marginTop: '2px' }}>Student • Bhopal</div>
        </div>
      </div>

      {/* Menu Options List */}
      <div className="flex-col" style={{ gap: '0.75rem' }}>
        {menuItems.map((item, idx) => (
          <div key={idx} className="card flex-row justify-between" style={{ padding: '1rem', marginBottom: 0, cursor: 'pointer', alignItems: 'center' }}>
            <div className="flex-row gap-4">
              <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '50%' }}>
                <item.icon size={20} color="#0f172a" />
              </div>
              <div>
                <div className="font-semibold" style={{ fontSize: '0.95rem', color: '#1e293b' }}>{item.label}</div>
                <div className="text-xs text-muted" style={{ marginTop: '2px' }}>{item.sub}</div>
              </div>
            </div>
            
            <div className="flex-row gap-3">
              {item.badge && (
                <div style={{ background: 'var(--danger)', color: 'white', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                  {item.badge}
                </div>
              )}
              <ChevronRight size={18} color="#9ca3af" />
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="card flex-row gap-4" style={{ padding: '1.25rem 1rem', marginTop: '0.5rem', cursor: 'pointer', alignItems: 'center', border: '1px solid #fee2e2' }}>
          <div style={{ background: '#fef2f2', padding: '0.5rem', borderRadius: '50%' }}>
            <LogOut size={20} color="var(--danger)" />
          </div>
          <div className="font-bold" style={{ fontSize: '0.95rem', color: 'var(--danger)' }}>Logout</div>
        </div>
      </div>

    </div>
  );
}