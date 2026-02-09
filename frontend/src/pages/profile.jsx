import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Title from "../components/Title";

const Profile = () => {
  const { token, navigate, backandUrl, setToken } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        backandUrl + "/api/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
        });
      } else {
        toast.error(response.data.message || "Failed to load profile");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        handleLogout();
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        backandUrl + "/api/user/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="text-center text-3xl py-8 mt-10">
        <Title text1="MY" text2="PROFILE" />
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-600">
          Loading profile...
        </div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Profile Card */}
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl p-8 mb-6 border border-white/30">
            
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                              flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <p className="mt-3 text-xl font-semibold text-gray-800">
                {user?.name}
              </p>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                             text-white font-medium shadow hover:scale-105 transition"
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border 
                             focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Name"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border 
                             focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Email"
                />

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 
                               text-white px-6 py-2 rounded-full hover:scale-105 transition"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                      });
                    }}
                    className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between bg-white/60 p-4 rounded-xl">
                  <span>Name</span>
                  <span className="font-semibold">{user?.name}</span>
                </div>

                <div className="flex justify-between bg-white/60 p-4 rounded-xl">
                  <span>Email</span>
                  <span className="font-semibold">{user?.email}</span>
                </div>

                <div className="flex justify-between bg-white/60 p-4 rounded-xl">
                  <span>Member Since</span>
                  <span className="font-semibold">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/orders")}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 
                         text-white px-6 py-3 rounded-full font-semibold 
                         hover:scale-105 transition shadow"
            >
              📦 View My Orders
            </button>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 
                         text-white px-6 py-3 rounded-full font-semibold 
                         hover:scale-105 transition shadow"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
