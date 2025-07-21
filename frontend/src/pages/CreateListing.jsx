import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Plus, Save, MapPin, DollarSign, Calendar, Users } from "lucide-react";

export default function CreateListing() {
  const navigate = useNavigate();
  const { user, addListing } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    genderPreference: "any",
    availableFrom: "",
    description: "",
    contactWhatsApp: "",
    contactEmail: user?.email || "",
    amenities: [],
    roomType: "private",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const amenityOptions = [
    "WiFi",
    "Laundry",
    "Parking",
    "Furnished",
    "Kitchen Access",
    "Utilities Included",
    "Air Conditioning",
    "Backyard",
    "Near Bus Stop",
    "Gym Access",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please create a profile first");
      navigate("/profile");
      return;
    }

    if (
      !formData.title ||
      !formData.location ||
      !formData.rent ||
      !formData.availableFrom ||
      !formData.description ||
      !formData.contactEmail
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    addListing({
      ...formData,
      userId: user.id,
      rent: parseInt(formData.rent),
      contactEmail: formData.contactEmail || user.email,
      availableFrom: new Date(formData.availableFrom),
    });

    alert("Listing created successfully!");
    setIsSubmitting(false);
    navigate("/listings");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Profile First
          </h2>
          <p className="text-gray-600 mb-6">
            You need to create a profile before posting a listing.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Post a Room</h1>
          <p className="text-gray-600 mt-2">
            Share your available space with fellow students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Spacious room near campus with great amenities"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" /> Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" /> Monthly Rent ($)
                *
              </label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" /> Gender Preference
              </label>
              <select
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="private">Private Room</option>
                <option value="shared">Shared Room</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" /> Available From *
            </label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.amenities.includes(amenity)
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="sr-only"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp (optional)
                </label>
                <input
                  type="tel"
                  name="contactWhatsApp"
                  value={formData.contactWhatsApp}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg transition-colors duration-200 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? "Posting..." : "Post Listing"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/listings")}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
