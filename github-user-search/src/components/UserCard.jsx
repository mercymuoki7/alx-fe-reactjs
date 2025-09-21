export default function UserCard({ user }) {
  if (!user) return null;
  return (
    <div>
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt={user.login} width="80" />
    </div>
  );
}
