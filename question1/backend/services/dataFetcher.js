import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get(`/users`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchPosts = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/posts`);
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchComments = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
