import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useRoomStore = create((set, get) => ({
  messages: [],
  isLoading: false,

  fetchMessages: async (cohortId) => {
    if (!cohortId) return;
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('cohort_messages')
        .select(`
          *,
          user:profiles(id, full_name, avatar_url, role)
        `)
        .eq('cohort_id', cohortId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const mappedMessages = data.map(msg => ({
        id: msg.id,
        content: msg.content,
        createdAt: msg.created_at,
        user: {
          id: msg.user?.id,
          name: msg.user?.full_name || 'User',
          avatar: msg.user?.avatar_url,
          role: msg.user?.role || 'Student'
        }
      }));

      set({ messages: mappedMessages });
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (cohortId, content) => {
    if (!content.trim() || !cohortId) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Optimistic update
      const tempId = Date.now().toString();
      const newMsg = {
        id: tempId,
        content,
        createdAt: new Date().toISOString(),
        user: {
          id: session.user.id,
          name: session.user.user_metadata?.full_name || 'You',
          role: 'Student'
        }
      };
      set((s) => ({ messages: [...s.messages, newMsg] }));

      // Insert to DB
      const { data, error } = await supabase
        .from('cohort_messages')
        .insert([{
          cohort_id: cohortId,
          user_id: session.user.id,
          content
        }])
        .select(`*, user:profiles(id, full_name, avatar_url, role)`)
        .single();

      if (error) throw error;

      // Replace optimistic message with actual DB record
      set((s) => ({
        messages: s.messages.map(m => m.id === tempId ? {
          id: data.id,
          content: data.content,
          createdAt: data.created_at,
          user: {
            id: data.user?.id,
            name: data.user?.full_name,
            avatar: data.user?.avatar_url,
            role: data.user?.role
          }
        } : m)
      }));
    } catch (err) {
      console.error('Failed to send message:', err);
      // Remove optimistic msg on error (lazy approach: refetch)
      get().fetchMessages(cohortId);
    }
  },

  subscribeToMessages: (cohortId) => {
    if (!cohortId) return null;
    const channel = supabase
      .channel(`room_${cohortId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'cohort_messages',
        filter: `cohort_id=eq.${cohortId}` 
      }, async (payload) => {
        // We need to fetch the user details for the new message since Postgres realtime only gives the row
        const { data: user } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, role')
          .eq('id', payload.new.user_id)
          .single();

        const newMsg = {
          id: payload.new.id,
          content: payload.new.content,
          createdAt: payload.new.created_at,
          user: {
            id: user?.id,
            name: user?.full_name || 'User',
            avatar: user?.avatar_url,
            role: user?.role || 'Student'
          }
        };

        set((s) => {
          // Avoid duplicates if we already optimistically added it
          const exists = s.messages.find(m => m.id === newMsg.id);
          if (exists) return s;
          
          // Filter out optimistic duplicates by checking content and time roughly
          // Simplest fix: Just append if not matching an exact ID
          return { messages: [...s.messages, newMsg] };
        });
      })
      .subscribe();
      
    return channel;
  }
}));

export default useRoomStore;
