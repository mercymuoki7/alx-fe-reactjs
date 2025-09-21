import React, { useState } from "react";
import { fetchUserData, fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);

    try {
      if (location || repos) {
        const results = await fetchAdvancedUsers(username, location, repos, 1);
        setUsers(results);
      } else if (username) {
        const user = await fetchUserData(username.trim());
        setUsers([user]);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const results = await fetchAdvancedUsers(username, location, repos, nextPage);
      setUsers([...users, ...results]);
      setPage(nextPage);
    } catch {
      setError("No more results found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
          className="border rounded p-2 w-32"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {users.length > 0 && (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="border rounded-lg p-4 shadow hover:shadow-md"
                >
                  <img
                    src={u.avatar_url}
                    alt={u.login}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <h3 className="font-semibold">{u.login}</h3>
                  {u.location && <p>📍 {u.location}</p>}
                  {u.public_repos !== undefined && (
                    <p>Repos: {u.public_repos}</p>
                  )}
                  <a
                    href={u.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Profile
                  </a>
                </li>
              ))}
            </ul>
            {location || repos ? (
              <div className="mt-4 text-center">
                <button
                  onClick={loadMore}
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                  Load More
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
