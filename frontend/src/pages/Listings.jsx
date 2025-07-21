import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  MessageCircle,
  Mail,
  GraduationCap,
  Search,
} from "lucide-react";

export default function Listings() {
  const { listings } = useUser();
  const [filters, setFilters] = useState({
    genderPreference: "any",
    maxRent: 1000,
    roomType: "any",
    university: "",
    searchTerm: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const universities = Array.from(
    new Set(listings.map((listing) => listing.university))
  ).sort();

  const filteredListings = listings.filter((listing) => {
    if (
      filters.genderPreference !== "any" &&
      listing.genderPreference !== "any" &&
      listing.genderPreference !== filters.genderPreference
    )
      return false;

    if (listing.rent > filters.maxRent) return false;
    if (filters.roomType !== "any" && listing.roomType !== filters.roomType)
      return false;
    if (filters.university && listing.university !== filters.university)
      return false;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        listing.title.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower) ||
        listing.university.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const sortedListings = [...filteredListings].sort(
    (a, b) => new Date(a.availableFrom) - new Date(b.availableFrom)
  );

  const handleWhatsAppContact = (phone, listingTitle) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your listing: ${listingTitle}`
    );
    window.open(
      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const isNew = (createdAt) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000; // within 7 days
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() =>
                    setFilters({
                      genderPreference: "any",
                      maxRent: 1000,
                      roomType: "any",
                      university: "",
                      searchTerm: "",
                    })
                  }
                  className="text-sm text-blue-600 hover:underline mt-1"
                >
                  Clear Filters
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div
              className={`space-y-6 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchTerm: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  University
                </label>
                <select
                  value={filters.university}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      university: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Universities</option>
                  {universities.map((university) => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender Preference
                </label>
                <select
                  value={filters.genderPreference}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      genderPreference: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Rent: ${filters.maxRent}
                </label>
                <input
                  type="range"
                  min="300"
                  max="1500"
                  step="50"
                  value={filters.maxRent}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxRent: parseInt(e.target.value),
                    }))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>$300</span>
                  <span>$1500</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Room Type
                </label>
                <select
                  value={filters.roomType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      roomType: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="any">Any</option>
                  <option value="private">Private Room</option>
                  <option value="shared">Shared Room</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Available Listings
            </h1>
            <p className="text-gray-600">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "listing" : "listings"} found
            </p>
          </div>

          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No listings found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedListings.map((listing) => (
                <div
                  key={listing._id || listing.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 flex items-center gap-2">
                        {listing.title}
                        {isNew(listing.createdAt) && (
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.genderPreference === "male"
                            ? "bg-blue-100 text-blue-800"
                            : listing.genderPreference === "female"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {listing.genderPreference === "any"
                          ? "Any"
                          : listing.genderPreference}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {listing.university}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          ${listing.rent}/month
                        </span>
                        <span className="mx-2">•</span>
                        <span className="text-sm capitalize">
                          {listing.roomType}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          Available from{" "}
                          {new Date(listing.availableFrom).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {listing.description}
                    </p>

                    {listing.amenities.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {listing.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {listing.contactWhatsApp && (
                        <button
                          onClick={() =>
                            handleWhatsAppContact(
                              listing.contactWhatsApp,
                              listing.title
                            )
                          }
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          WhatsApp
                        </button>
                      )}
                      <a
                        href={`mailto:${listing.contactEmail}?subject=Interest in ${listing.title}`}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
