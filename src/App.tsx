import { useCallback, useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import MenuButton from '@/components/Navigation/MenuButton';
import Sidebar, { type NavTarget } from '@/components/Navigation/Sidebar';
import MyEventsBox from '@/components/Navigation/MyEventsBox';
import AuthModal from '@/components/Auth/AuthModal';
import CreateEventModal from '@/components/Events/CreateEventModal';
import Home from '@/pages/Home';
import type { ClassifiedEvent } from '@/types/event';

function AppInner() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavTarget>('home');
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<ClassifiedEvent | null>(null);

  const requireAuth = useCallback(() => setAuthOpen(true), []);

  const handleNavigate = useCallback((target: NavTarget) => {
    setActiveNav(target);
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    requestAnimationFrame(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }, []);

  const handleCreateEvent = useCallback(() => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setCreateOpen(true);
  }, [user]);

  return (
    <div className="min-h-screen bg-royal-black text-royal-ivory">
      <MenuButton onClick={() => setSidebarOpen(true)} />
      <MyEventsBox onSignIn={requireAuth} onSelectEvent={setDetailEvent} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        active={activeNav}
        onCreateEvent={handleCreateEvent}
      />
      <Home
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onRequireAuth={requireAuth}
        detailEvent={detailEvent}
        onSelectEvent={setDetailEvent}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CreateEventModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
