import { useEffect, useState } from "react";
import { getToken } from "../services/authService";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        setUser({
          name: payload.name || "User",
          email: payload.email || "",
        });
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = () => {
    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    alert(
      "Backend API for changing password will be added later."
    );
  };
  const handleLogout = () => {
  logout();

  alert("Logged out successfully!");

  navigate("/login");
};

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mt-6">
          My Profile
        </h1>

        <div className="mt-8 space-y-5">

          <div>
            <p className="text-gray-500">
              Name
            </p>

            {editing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border rounded-lg p-3 mt-1 w-full"
              />
            ) : (
              <div className="border rounded-lg p-3 mt-1">
                {user.name}
              </div>
            )}
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>

            {editing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border rounded-lg p-3 mt-1 w-full"
              />
            ) : (
              <div className="border rounded-lg p-3 mt-1">
                {user.email}
              </div>
            )}
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className={`w-full py-3 rounded-lg text-white ${
              editing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editing
              ? "💾 Save Profile"
              : "✏ Edit Profile"}
          </button>

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">
              🔒 Change Password
            </h2>

            <div className="space-y-4">

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border rounded-lg p-3"
              />

              <button
                onClick={handlePasswordSubmit}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
              >
                🔐 Change Password
              </button>

            </div>
            <div className="mt-8">

  <button
    onClick={handleLogout}
    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
  >
    🚪 Logout
  </button>

</div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
