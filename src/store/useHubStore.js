import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import useStudentStore from './useStudentStore';

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
      const { data: channelsData, error: channelsError } = await supabase
        .from('channels')
        .select('*');
        
      if (channelsError) throw channelsError;

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
      
      const formattedPosts = postsData.map(post => {
        if (session && post.user_id === session.user.id) {
          const postDate = new Date(post.created_at);
          const today = new Date();
          if (postDate.toDateString() === today.toDateString()) {
            todayCount++;
          }
        }
        
        return {
          id: post.id,
          channelId: post.channel_id,
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
        channels: channelsData || [], 
        posts: formattedPosts,
        postsToday: todayCount,
        activeChannelId: channelsData.length > 0 ? channelsData[0].id : null
      });

    } catch (err) {
      console.error('Failed to fetch community', err);
    }
  },

  // ---- Create Post (with mandatory tag) ----
  createPost: async (postData) => {
    if (!get().canPost()) return false;
    if (!postData.tag) return false;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Please login to post.");
        return false;
      }

      const { data, error } = await supabase
        .from('hub_posts')
        .insert([{
          channel_id: get().activeChannelId,
          user_id: session.user.id,
          tag: postData.tag,
          title: postData.title,
          content: postData.content
        }])
        .select(`*, author:profiles(id, full_name, role, contribution_score)`)
        .single();

      if (error) throw error;

      if (data) {
        const newPost = {
          id: data.id,
          channelId: data.channel_id,
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
        return true;
      }
    } catch (err) {
      console.error('Failed to create post', err);
    }
    return false;
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
