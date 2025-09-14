import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import UserContext from "./UserContext";

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>

      {/* Keep the rest of your tree to show the refactor removed prop drilling */}
      <UserInfo />
    </div>
  );
}

export default UserProfile;


