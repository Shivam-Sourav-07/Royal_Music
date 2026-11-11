import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export interface SavedEvent {
  id: string;
  event_id: string;
  created_at: string;
}

export function useSavedEvents() {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setSavedIds(new Set());
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('user_saved_events')
      .select('id, event_id, created_at')
      .eq('user_id', user.id);
    if (error) {
      setLoading(false);
      return;
    }
    setSavedIds(new Set((data ?? []).map((r) => r.event_id)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleSaved = useCallback(
    async (eventId: string): Promise<boolean> => {
      if (!user) return false;
      const isSaved = savedIds.has(eventId);
      if (isSaved) {
        const { error } = await supabase
          .from('user_saved_events')
          .delete()
          .eq('user_id', user.id)
          .eq('event_id', eventId);
        if (error) return false;
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(eventId);
          return next;
        });
        return false;
      }
      const { error } = await supabase
        .from('user_saved_events')
        .insert({ event_id: eventId });
      if (error) return false;
      setSavedIds((prev) => new Set(prev).add(eventId));
      return true;
    },
    [user, savedIds],
  );

  return { savedIds, loading, toggleSaved, reload: load };
}
