import React, { use } from "react";

function Feed() {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts?type=latest");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <h1>Top Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} - {post.commentCount} comments
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;
