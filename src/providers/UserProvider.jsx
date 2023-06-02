import { useState } from "react";
import { UserContext } from "../contexts/UserContext.jsx";

const UserProvider = ({ children }) => {
  // const [profile, setProfile] = useState();
  const [profile, setProfile] = useState({ name: "Tümi" });
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ profile, setProfile, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
