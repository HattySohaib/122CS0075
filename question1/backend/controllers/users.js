import {
  fetchUsers,
  fetchPosts,
  fetchComments,
} from "../services/dataFetcher.js";

export const getTopUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    const userIds = Object.keys(users);
    const userCommentCounts = {};

    // For each user, get posts and comments
    for (const userId of userIds) {
      const posts = await fetchPosts(userId);
      let totalComments = 0;

      for (const post of posts) {
        const commentsData = await fetchComments(post.id);
        const commentCount = Array.isArray(commentsData)
          ? commentsData.length
          : 0;
        totalComments += commentCount;
      }

      userCommentCounts[userId] = totalComments;
      console.log(totalComments);
    }

    // Sort users by total comment count, descending
    const sorted = Object.entries(userCommentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // top 5

    // Prepare final response
    const topUsers = sorted.map(([userId, commentCount]) => ({
      userId,
      name: users[userId],
      totalComments: commentCount,
    }));

    res.status(200).json({ topUsers });
  } catch (err) {
    console.error("Error in getTopUsers:", err.message);
    res.status(500).json({ error: "Failed to fetch top users" });
  }
};
