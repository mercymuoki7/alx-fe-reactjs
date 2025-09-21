import axios from "axios";

// Basic single-user fetch
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

// Advanced search using GitHub Search API
export const fetchAdvancedUsers = async (username, location, repos) => {
  try {
    let query = "";
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (repos) query += `repos:>=${repos}`;

    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
    );
    return response.data.items;
  } catch (error) {
    throw new Error("No matching users found");
  }
};
