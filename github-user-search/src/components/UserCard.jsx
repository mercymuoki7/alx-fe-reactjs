export default function UserCard({ user }) {
  if (!user) return null;
  return (
    <div className="border rounded-lg p-4 shadow">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img src={user.avatar_url} alt={user.login} style={{ width: 64, height: 64, borderRadius: 999 }} />
        <div>
          <h3 style={{ margin: 0, fontWeight: 600 }}>{user.name || user.login}</h3>
          <p style={{ margin: "4px 0" }}>{user.login}</p>
          {user.location && <p style={{ margin: 0 }}>📍 {user.location}</p>}
          {user.public_repos !== undefined && <p style={{ margin: 0 }}>Repos: {user.public_repos}</p>}
          <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
        </div>
      </div>
    </div>
  );
}
