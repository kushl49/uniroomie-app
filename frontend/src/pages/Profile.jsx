import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { User, Save, Edit3, GraduationCap, Mail, Phone } from "lucide-react";

export default function Profile() {
  const { user, setUser, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(!user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "male",
    phone: user?.phone || "",
    university: user?.university || "",
    bio: user?.bio || "",
    isLookingForAccommodation: user?.isLookingForAccommodation || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      updateUser(formData);
    } else {
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
    }

    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (!isEditing && user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100 text-lg">{user.university}</p>
                {user.isLookingForAccommodation && (
                  <span className="inline-block mt-2 px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                    Looking for accommodation
                  </span>
                )}
                <p className="text-blue-200 text-sm mt-2">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-gray-800 capitalize">{user.gender}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">University</p>
                    <p className="text-gray-800">{user.university}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About Me
              </h3>
              {user.bio ? (
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              ) : (
                <p className="text-gray-400 italic">No bio added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user ? "Edit Profile" : "Create Your Profile"}
          </h1>
          <p className="text-gray-600 mt-2">
            {user
              ? "Update your information"
              : "Tell us about yourself to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@university.edu"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                pattern="[+0-9\s\-()]{10,}"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. +91XXXXXXXXXX or +1XXXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University *
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your university name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Me
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell others about yourself, your habits, preferences, and what you're looking for..."
            />
          </div>

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="isLookingForAccommodation"
              name="isLookingForAccommodation"
              checked={formData.isLookingForAccommodation}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isLookingForAccommodation"
              className="ml-2 text-sm text-gray-700"
            >
              I'm currently looking for accommodation
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.phone ||
                !formData.university
              }
              className={`flex-1 flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors duration-200
    ${
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.university
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }
  `}
            >
              <Save className="w-4 h-4 mr-2" />
              {user ? "Update Profile" : "Create Profile"}
            </button>

            {user && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
