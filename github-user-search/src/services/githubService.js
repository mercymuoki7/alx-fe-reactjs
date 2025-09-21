import axios from "axios";

const BASE_URL = "https://api.github.com";

// Basic fetch by username
export const fetchUserData = async (username) => {
  if (!username) throw new Error("username required");
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.data;
  } catch (err) {
    throw new Error("User not found");
  }
};

// Advanced search (username + location + minRepos)
export const fetchAdvancedUsers = async (username, location, minRepos, page = 1, per_page = 10) => {
  try {
    const parts = [];
    if (username) parts.push(`${username} in:login`);
    if (location) parts.push(`location:${location}`);
    if (minRepos) parts.push(`repos:>=${minRepos}`);

    const query = parts.join(' ');
    const res = await axios.get(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`);
    return res.data.items;
  } catch (err) {
    throw new Error("No matching users found");
  }
};

// Fetch full user details (location, public_repos, etc.)
export const fetchUserDetails = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch user details");
  }
};

// Combined: get search results then fetch details for each user
export const fetchAdvancedUsersDetailed = async (username, location, minRepos, page = 1, per_page = 10) => {
  const items = await fetchAdvancedUsers(username, location, minRepos, page, per_page);
  const promises = items.map((it) => fetchUserDetails(it.login));
  const detailed = await Promise.all(promises);
  return detailed;
};
