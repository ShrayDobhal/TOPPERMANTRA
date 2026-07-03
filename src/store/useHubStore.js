import { create } from 'zustand';
import { channels, hubPosts, postComments } from '../lib/mockHub';
import api from '../lib/api';

const useHubStore = create((set, get) => ({
  // ---- Channels ----
  channels: channels,
  activeChannelId: 'ch-cs', // Default to user's branch
  setActiveChannel: (id) => set({ activeChannelId: id }),

  // ---- Posts ----
  posts: hubPosts,
  comments: postComments,

  // ---- Rate Limiting ----
  postsToday: 1,
  maxPostsPerDay: 5, // Based on level
  canPost: () => get().postsToday < get().maxPostsPerDay,
  getRemainingPosts: () => get().maxPostsPerDay - get().postsToday,

  // ---- Fetch from API ----
  fetchCommunity: async () => {
    try {
      const res = await api.get('/community');
      if (res.data.success) {
        set({ channels: res.data.data.channels, posts: res.data.data.posts });
      }
    } catch (err) {
      console.error('Failed to fetch community', err);
    }
  },

  // ---- Create Post (with mandatory tag) ----
  createPost: async (postData) => {
    if (!get().canPost()) return false;
    if (!postData.tag) return false;
    try {
      const res = await api.post('/community/posts', postData);
      if (res.data.success) {
        set((s) => ({ posts: [res.data.data, ...s.posts], postsToday: s.postsToday + 1 }));
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
      const res = await api.post(`/community/posts/${postId}/upvote`);
      if (res.data.success) {
        set((s) => ({
          posts: s.posts.map(p => p.id === postId ? { ...p, upvotes: res.data.data.upvotes } : p),
        }));
      }
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  },

  upvoteComment: async (postId, commentId) => {
    try {
      const res = await api.post(`/community/comments/${commentId}/upvote`);
      if (res.data.success) {
        set((s) => ({
          comments: {
            ...s.comments,
            [postId]: (s.comments[postId] || []).map(c =>
              c.id === commentId ? { ...c, upvotes: res.data.data.upvotes } : c
            ).sort((a, b) => b.upvotes - a.upvotes),
          },
        }));
      }
    } catch (err) {
      console.error('Failed to upvote comment', err);
    }
  },

  // ---- Filter by tag ----
  getPostsByTag: (tag) => get().posts.filter(p => p.tag === tag),
  getPostsByChannel: (channelId) => get().posts.filter(p => p.channelId === channelId),
}));

export default useHubStore;
