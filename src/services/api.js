import axios from "axios";

// Simple test request to confirm Axios is set up
export const testApi = async () => {
  try {
    const response = await axios.get("https://api.github.com");
    console.log("GitHub API status:", response.status);
    return response.status;
  } catch (error) {
    console.error("API test failed:", error);
    return null;
  }
};
