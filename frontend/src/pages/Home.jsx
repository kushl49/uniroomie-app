import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  Plus,
  Shield,
  Clock,
  MapPin,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "Gender-sensitive filtering and verified student profiles for your safety and comfort.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find the perfect room with advanced filters for location, budget, and preferences.",
    },
    {
      icon: Users,
      title: "Connect Easily",
      description:
        "Browse active seekers and connect directly through WhatsApp or email.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Get the latest listings and availability updates as they happen.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Student Housing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Say goodbye to chaotic WhatsApp groups. UniRoomie connects university
              students with safe, affordable off-campus housing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listings"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Listings
              </Link>
              <Link
                to="/create-listing"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post Listing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose UniRoomie?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've designed every feature with student needs in mind, making housing search
              simple, safe, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of students already using UniRoomie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/seekers"
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-center border border-gray-100 hover:border-blue-200"
            >
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Find Roommates
              </h3>
              <p className="text-gray-600">
                Browse students actively looking for accommodation
              </p>
            </Link>

            <Link
              to="/listings"
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-center border border-gray-100 hover:border-purple-200"
            >
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Explore Rooms
              </h3>
              <p className="text-gray-600">
                Discover available rooms and apartments near campus
              </p>
            </Link>

            <Link
              to="/profile"
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-center border border-gray-100 hover:border-orange-200"
            >
              <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Create Profile
              </h3>
              <p className="text-gray-600">
                Set up your profile and preferences to get started
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
