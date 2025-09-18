// src/services/api.js

const API_URL = "https://api.github.com/users/";

export const fetchUser = async (username) => {
  try {
    const response = await fetch(`${API_URL}${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
