import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import {
  Filter,
  User,
  MessageCircle,
  Mail,
  GraduationCap,
  Search,
} from "lucide-react";

export default function Seekers() {
  const { seekers } = useUser();
  const [genderFilter, setGenderFilter] = useState("any");
  const [universityFilter, setUniversityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const universities = Array.from(
    new Set(seekers.map((seeker) => seeker.university))
  ).sort();

  const filteredSeekers = seekers.filter((seeker) => {
    if (genderFilter !== "any" && seeker.gender !== genderFilter) return false;
    if (universityFilter && seeker.university !== universityFilter)
      return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        seeker.name.toLowerCase().includes(searchLower) ||
        seeker.university.toLowerCase().includes(searchLower) ||
        (seeker.bio && seeker.bio.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const sortedSeekers = [...filteredSeekers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleWhatsAppContact = (phone, name) => {
    const message = encodeURIComponent(
      `Hi ${name}! I saw your profile on UniRoomie and have a potential housing option for you.`
    );
    window.open(
      `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Filter Seekers
                </h2>
                <button
                  onClick={() => {
                    setGenderFilter("any");
                    setUniversityFilter("");
                    setSearchTerm("");
                  }}
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
                    placeholder="Search seekers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  University
                </label>
                <select
                  value={universityFilter}
                  onChange={(e) => setUniversityFilter(e.target.value)}
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
                  Gender
                </label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="any">Any</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Seekers Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {filteredSeekers.length} students looking for housing
            </h1>
            <p className="text-gray-600">
              {filteredSeekers.length}{" "}
              {filteredSeekers.length === 1 ? "student" : "students"} currently
              seeking accommodation
            </p>
          </div>

          {filteredSeekers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No seekers found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedSeekers.map((seeker) => (
                <div
                  key={seeker.id || seeker._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {seeker.name}
                        </h3>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            seeker.gender === "male"
                              ? "bg-blue-100 text-blue-800"
                              : seeker.gender === "female"
                              ? "bg-pink-100 text-pink-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {seeker.gender}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{seeker.university}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{seeker.email}</span>
                      </div>
                    </div>

                    {seeker.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {seeker.bio}
                      </p>
                    )}

                    <div className="flex gap-2">
                      {seeker.phone ? (
  <button
    onClick={() => handleWhatsAppContact(seeker.phone, seeker.name)}
    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
  >
    <MessageCircle className="w-4 h-4 mr-2" />
    WhatsApp
  </button>
) : null}

                      <a
                        href={`mailto:${seeker.email}?subject=Housing Opportunity from UniRoomie`}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 text-center">
                      Member since{" "}
                      {seeker.createdAt ? new Date(seeker.createdAt).toLocaleDateString() : "—"}
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
