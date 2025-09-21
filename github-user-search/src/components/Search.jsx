import { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (location || minRepos) {
        const results = await fetchAdvancedUsers(username, location, minRepos);
        setUsers(results);
      } else {
        const user = await fetchUserData(username);
        setUsers([user]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {users.length > 0 && (
          <div className="grid gap-4 mt-4">
            {users.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
