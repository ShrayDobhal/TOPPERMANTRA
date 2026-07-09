import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';
import toast from 'react-hot-toast';

const useHubStore = create((set, get) => ({
  // ---- Channels ----
  channels: [],
  activeChannelId: null, 
  setActiveChannel: (id) => set({ activeChannelId: id }),

  // ---- Posts ----
  posts: [],
  comments: {},

  // ---- Rate Limiting ----
  postsToday: 0,
  maxPostsPerDay: 5,
  canPost: () => get().postsToday < get().maxPostsPerDay,
  getRemainingPosts: () => get().maxPostsPerDay - get().postsToday,

  // ---- Fetch from API ----
  fetchCommunity: async () => {
    try {
      // Fetch Channels
      let { data: channelsData, error: channelsError } = await supabase
        .from('channels')
        .select('*');
        
      if (channelsError) throw channelsError;

      // Since RLS prevents inserting channels from the client, use a fallback if empty
      if (!channelsData || channelsData.length === 0) {
        channelsData = [{ id: 'default-global', name: 'Global', type: 'global', postsToday: 0 }];
      }

      // Fetch Posts
      const { data: postsData, error: postsError } = await supabase
        .from('hub_posts')
        .select(`
          *,
          author:profiles(id, full_name, role, contribution_score)
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;
      
      // Calculate today's posts by current user
      const { data: { session } } = await supabase.auth.getSession();
      let todayCount = 0;
      
      const formattedPosts = (postsData || []).map(post => {
        if (session && post.user_id === session.user.id) {
          const postDate = new Date(post.created_at);
          const today = new Date();
          if (postDate.toDateString() === today.toDateString()) {
            todayCount++;
          }
        }
        
        return {
          id: post.id,
          // Map null channel_id back to default-global so UI filters work
          channelId: post.channel_id || 'default-global',
          tag: post.tag,
          title: post.title,
          content: post.content,
          upvotes: post.upvotes,
          createdAt: post.created_at,
          comments: 0, // In real app, fetch count
          isCurrentUser: session ? post.user_id === session.user.id : false,
          author: {
            id: post.author.id,
            name: post.author.full_name,
            level: Math.floor((post.author.contribution_score || 0) / 100) + 1,
            contributionScore: post.author.contribution_score || 0
          }
        };
      });

      set({ 
        channels: channelsData, 
        posts: formattedPosts,
        postsToday: todayCount,
        activeChannelId: channelsData.length > 0 ? channelsData[0].id : null
      });

    } catch (err) {
      console.error('Failed to fetch community', err);
    }
  },

  createPost: async (postData) => {
    if (!get().canPost()) {
      toast.error("Daily limit reached.");
      return false;
    }
    if (!postData.tag) {
      toast.error("Tag is required.");
      return false;
    }
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session) {
        toast.error("Please login to post.");
        return false;
      }

      if (!get().activeChannelId) {
        toast.error("No active channel selected. Please try again.");
        return false;
      }

      // Safety net: Ensure user has a profile record to prevent foreign key constraint violations
      const { error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single();
        
      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        console.log("Profile missing before post. Auto-creating...");
        await supabase.from('profiles').insert([{ 
          id: session.user.id, 
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'New Student',
          avatar_url: session.user.user_metadata?.avatar_url || ''
        }]);
      }

      // Map 'default-global' back to null so we don't violate foreign key constraint
      const dbChannelId = get().activeChannelId === 'default-global' ? null : get().activeChannelId;

      const { data, error } = await supabase
        .from('hub_posts')
        .insert([{
          channel_id: dbChannelId,
          user_id: session.user.id,
          tag: postData.tag,
          title: postData.title,
          content: postData.content
        }])
        .select(`*, author:profiles(id, full_name, role, contribution_score)`)
        .single();

      if (error) {
        console.error("Supabase createPost error:", error);
        toast.error(error.message || "Failed to create post.");
        throw error;
      }

      if (data) {
        const newPost = {
          id: data.id,
          channelId: data.channel_id || 'default-global',
          tag: data.tag,
          title: data.title,
          content: data.content,
          upvotes: data.upvotes,
          createdAt: data.created_at,
          comments: 0,
          isCurrentUser: true,
          author: {
            id: data.author.id,
            name: data.author.full_name,
            level: Math.floor((data.author.contribution_score || 0) / 100) + 1,
            contributionScore: data.author.contribution_score || 0
          }
        };

        set((s) => ({ 
          posts: [newPost, ...s.posts], 
          postsToday: s.postsToday + 1 
        }));
        toast.success("Discussion posted successfully!");
        return true;
      }
    } catch (err) {
      console.error('Failed to create post catch block', err);
      if (!err.message) {
         toast.error("An unexpected error occurred");
      } else {
         toast.error(err.message);
      }
    }
    return false;
  },

  // ---- Comments ----
  fetchComments: async (postId) => {
    try {
      const { data, error } = await supabase
        .from('hub_comments')
        .select('*, author:profiles(id, full_name, role, contribution_score)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      const formattedComments = data.map(c => ({
        id: c.id,
        postId: c.post_id,
        content: c.content,
        upvotes: c.upvotes,
        createdAt: c.created_at,
        author: {
          id: c.author.id,
          name: c.author.full_name,
          level: Math.floor((c.author.contribution_score || 0) / 100) + 1
        }
      }));
      
      set((s) => ({
        comments: { ...s.comments, [postId]: formattedComments }
      }));
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
  },

  createComment: async (postId, content) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to comment.");
        return false;
      }
      
      // Ensure profile exists
      const { error: profileCheckError } = await supabase.from('profiles').select('id').eq('id', session.user.id).single();
      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        await supabase.from('profiles').insert([{ 
          id: session.user.id, 
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'New Student'
        }]);
      }

      const { data, error } = await supabase
        .from('hub_comments')
        .insert([{
          post_id: postId,
          user_id: session.user.id,
          content: content
        }])
        .select('*, author:profiles(id, full_name, role, contribution_score)')
        .single();
        
      if (error) throw error;
      
      const newComment = {
        id: data.id,
        postId: data.post_id,
        content: data.content,
        upvotes: data.upvotes,
        createdAt: data.created_at,
        author: {
          id: data.author.id,
          name: data.author.full_name,
          level: Math.floor((data.author.contribution_score || 0) / 100) + 1
        }
      };
      
      set((s) => ({
        comments: {
          ...s.comments,
          [postId]: [...(s.comments[postId] || []), newComment]
        },
        posts: s.posts.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p)
      }));
      
      return true;
    } catch (err) {
      console.error('Failed to create comment', err);
      toast.error(err.message || "Failed to post comment.");
      return false;
    }
  },

  // ---- Upvote ----
  upvotePost: async (postId) => {
    try {
      // For demo purposes, we will just increment on the client and update DB
      const post = get().posts.find(p => p.id === postId);
      if (!post) return;
      
      const newUpvotes = post.upvotes + 1;

      const { error } = await supabase
        .from('hub_posts')
        .update({ upvotes: newUpvotes })
        .eq('id', postId);

      if (error) throw error;

      set((s) => ({
        posts: s.posts.map(p => p.id === postId ? { ...p, upvotes: newUpvotes } : p),
      }));
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  },

  upvoteComment: async (postId, commentId) => {
    console.log("Upvote comment logic would go here", commentId);
  },

  // ---- Filter by tag ----
  getPostsByTag: (tag) => get().posts.filter(p => p.tag === tag),
  getPostsByChannel: (channelId) => get().posts.filter(p => p.channelId === channelId),
}));

export default useHubStore;
