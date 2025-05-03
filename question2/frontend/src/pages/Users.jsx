import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <div className="users">
      <h1>Top Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.name} - {user.totalComments} comments
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
