import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/ui/Loader";

import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../services/userService";

import { logoutUser } from "../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaCamera,
  FaSave,
  FaEdit,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: "",

    phone: "",
    bio: "",
    education: "",
    experience: "",
    skills: "",

    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser({
        name: res.user.name || "",
        email: res.user.email || "",
        profilePicture: res.user.profilePicture || "",

        phone: res.user.phone || "",
        bio: res.user.bio || "",
        education: res.user.education || "",
        experience: res.user.experience || "",
        skills: res.user.skills || "",

        github: res.user.github || "",
        linkedin: res.user.linkedin || "",
        portfolio: res.user.portfolio || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(user);

      alert("Profile Updated Successfully");

      setEditing(false);

      loadProfile();

    } catch (err) {
      console.log(err);
      alert("Profile Update Failed");
    }
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const res = await uploadProfilePicture(file);

      setUser((prev) => ({
        ...prev,
        profilePicture: res.profilePicture,
      }));

      alert("Profile Picture Updated");

    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Backend password API will be connected later.");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">

<div className="max-w-7xl mx-auto px-6 py-12">

{/* Hero */}

<div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl text-white p-10">

<div className="flex justify-between items-center flex-wrap gap-6">

<div>

<h1 className="text-5xl font-extrabold">
👤 My Profile
</h1>

<p className="text-blue-100 mt-3 text-lg">
Manage your ResumeX AI account, portfolio and personal information.
</p>

</div>

<div className="hidden lg:block text-8xl opacity-20">
<FaUser />
</div>

</div>

</div>

<div className="grid lg:grid-cols-3 gap-8 mt-10">

{/* Left Card */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex flex-col items-center">

{user.profilePicture ? (

<img
src={user.profilePicture}
alt="Profile"
className="w-40 h-40 rounded-full object-cover border-8 border-blue-500 shadow-xl"
/>

) : (

<div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center text-white text-6xl font-bold shadow-xl">

{user.name
? user.name.charAt(0).toUpperCase()
: "U"}

</div>

)}

<label
htmlFor="profileUpload"
className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
>

<FaCamera />

Change Picture

</label>

<input
id="profileUpload"
type="file"
accept="image/*"
onChange={handleProfilePicture}
className="hidden"
/>

<h2 className="text-3xl font-bold mt-6">
{user.name}
</h2>

<p className="text-gray-500">
{user.email}
</p>

</div>

<div className="grid grid-cols-3 gap-4 mt-10">

<div className="bg-blue-50 rounded-xl p-4 text-center">

<h3 className="text-blue-700 font-bold">
Resumes
</h3>

<p className="text-3xl font-bold">
12
</p>

</div>

<div className="bg-green-50 rounded-xl p-4 text-center">

<h3 className="text-green-700 font-bold">
ATS
</h3>

<p className="text-3xl font-bold">
88
</p>

</div>

<div className="bg-purple-50 rounded-xl p-4 text-center">

<h3 className="text-purple-700 font-bold">
Interviews
</h3>

<p className="text-3xl font-bold">
5
</p>

</div>

</div>

<div className="mt-10">

<button
onClick={handleLogout}
className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex justify-center items-center gap-3 transition"
>

<FaSignOutAlt />

Logout

</button>

</div>

</div>

{/* Right Section */}

<div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-bold">

Personal Information

</h2>

{editing ? (

<button
onClick={handleSaveProfile}
className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
>

<FaSave />

Save Profile

</button>

) : (

<button
onClick={() => setEditing(true)}
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
>

<FaEdit />

Edit Profile

</button>

)}

</div>

<div className="grid md:grid-cols-2 gap-6">

</div>
{/* Name */}

<div>

<label className="font-semibold flex items-center gap-2 mb-2">
<FaUser className="text-blue-600" />
Full Name
</label>

{editing ? (

<input
type="text"
name="name"
value={user.name}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 outline-none"
/>

) : (

<div className="border-2 border-gray-200 rounded-xl p-4">
{user.name}
</div>

)}

</div>

{/* Email */}

<div>

<label className="font-semibold flex items-center gap-2 mb-2">
<FaEnvelope className="text-red-500" />
Email
</label>

{editing ? (

<input
type="email"
name="email"
value={user.email}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 outline-none"
/>

) : (

<div className="border-2 border-gray-200 rounded-xl p-4">
{user.email}
</div>

)}

</div>

{/* Phone */}

<div>

<label className="font-semibold flex items-center gap-2 mb-2">
<FaPhone className="text-green-600" />
Phone
</label>

<input
type="text"
name="phone"
value={user.phone}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* Skills */}

<div>

<label className="font-semibold mb-2 block">
Skills
</label>

<textarea
rows="4"
name="skills"
value={user.skills}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* Bio */}

<div className="md:col-span-2">

<label className="font-semibold mb-2 block">
Bio
</label>

<textarea
rows="4"
name="bio"
value={user.bio}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* Education */}

<div className="md:col-span-2">

<label className="font-semibold flex items-center gap-2 mb-2">
<FaGraduationCap className="text-indigo-600" />
Education
</label>

<textarea
rows="4"
name="education"
value={user.education}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* Experience */}

<div className="md:col-span-2">

<label className="font-semibold flex items-center gap-2 mb-2">
<FaBriefcase className="text-orange-600" />
Experience
</label>

<textarea
rows="4"
name="experience"
value={user.experience}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* GitHub */}

<div>

<label className="font-semibold flex items-center gap-2 mb-2">
<FaGithub />
GitHub
</label>

<input
type="text"
name="github"
value={user.github}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* LinkedIn */}

<div>

<label className="font-semibold flex items-center gap-2 mb-2">
<FaLinkedin className="text-blue-700" />
LinkedIn
</label>

<input
type="text"
name="linkedin"
value={user.linkedin}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

{/* Portfolio */}

<div className="md:col-span-2">

<label className="font-semibold flex items-center gap-2 mb-2">
<FaGlobe className="text-purple-600" />
Portfolio
</label>

<input
type="text"
name="portfolio"
value={user.portfolio}
disabled={!editing}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-xl p-4"
/>

</div>

</div>
{/* Change Password */}

<div className="mt-12 border-t pt-10">

  <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
    <FaLock className="text-red-600" />
    Change Password
  </h2>

  <div className="grid md:grid-cols-3 gap-5">

    <input
      type="password"
      name="currentPassword"
      placeholder="Current Password"
      value={passwords.currentPassword}
      onChange={handlePasswordChange}
      className="border-2 border-gray-200 rounded-xl p-4"
    />

    <input
      type="password"
      name="newPassword"
      placeholder="New Password"
      value={passwords.newPassword}
      onChange={handlePasswordChange}
      className="border-2 border-gray-200 rounded-xl p-4"
    />

    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={passwords.confirmPassword}
      onChange={handlePasswordChange}
      className="border-2 border-gray-200 rounded-xl p-4"
    />

  </div>

  <button
    onClick={handlePasswordSubmit}
    className="mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl transition"
  >
    Change Password
  </button>

</div>

</div>

</div>

</div>



);
};

export default Profile;
