import { useContext, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserContext } from "./contexts/UserContext.jsx";

export default function Login() {
  const { user, setUser, profile, setProfile } = useContext(UserContext);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div className="flex space-x-4 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={profile.picture}
            alt="user image"
          />
          <p>{profile.name}</p>
          <button
            className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-2 px-4 rounded shadow"
            onClick={logOut}
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-2 px-4 rounded shadow"
          onClick={() => login()}
        >
          Sign in with Google 🚀{" "}
        </button>
      )}
    </div>
  );
}
