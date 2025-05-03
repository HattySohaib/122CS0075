import {
  fetchUsers,
  fetchPosts,
  fetchComments,
} from "../services/dataFetcher.js";

export const getPosts = async (req, res) => {
  const type = req.query.type?.toLowerCase();

  if (!type) {
    return res.status(400).send("Type is required");
  }

  try {
    const users = await fetchUsers();
    const userIds = Object.keys(users);

    let allPosts = [];

    // Collect all posts across all users
    for (const userId of userIds) {
      const posts = await fetchPosts(userId);
      allPosts = allPosts.concat(posts);
    }

    if (type === "latest") {
      // Sort by post ID
      const latestPosts = allPosts
        .sort((a, b) => b.id - a.id) // Larger IDs are newer posts
        .slice(0, 20);

      return res.status(200).json({ posts: latestPosts });
    }

    if (type === "popular") {
      const postsWithComments = [];

      for (const post of allPosts) {
        const comments = await fetchComments(post.id);
        postsWithComments.push({
          ...post,
          commentCount: Array.isArray(comments) ? comments.length : 0,
        });
      }

      const popularPosts = postsWithComments
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 20);

      return res.status(200).json({ posts: popularPosts });
    }

    return res.status(400).send("Invalid type");
  } catch (error) {
    console.error("Error in getPosts:", error.message);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
