import axios from "axios";

const BASE_URL = "https://api.github.com";

// Basic search by username
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};

// Advanced search (username + location + minRepos)
export const fetchAdvancedUsers = async (username, location, minRepos) => {
  try {
    let query = username ? `${username} in:login` : "";

    if (location) {
      query += ` location:${location}`;
    }
    if (minRepos) {
      query += ` repos:>=${minRepos}`;
    }

    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    return response.data.items;
  } catch (error) {
    throw new Error("Error fetching advanced search results");
  }
};
