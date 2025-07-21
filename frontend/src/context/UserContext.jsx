import React, { createContext, useContext, useState, useEffect } from "react";
import API from '../api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [seekers, setSeekers] = useState([]);

  // Load sample data on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//   const savedListings = localStorage.getItem('listings');
//   const savedSeekers = localStorage.getItem('seekers');

//   if (savedUser && savedListings && savedSeekers) {
//     setUser(JSON.parse(savedUser));
//     setListings(JSON.parse(savedListings));
//     setSeekers(JSON.parse(savedSeekers));
//   } else {
//     const sampleUsers = [
//       {
//         id: "1",
//         name: "Sarah Johnson",
//         email: "sarah.j@university.edu",
//         gender: "female",
//         phone: "+1234567890",
//         isLookingForAccommodation: true,
//         university: "State University",
//         bio: "Third-year Computer Science student looking for a quiet place to study. Non-smoker, clean, and respectful.",
//         createdAt: new Date("2024-01-15"),
//       },
//       {
//         id: "2",
//         name: "Michael Chen",
//         email: "michael.c@university.edu",
//         gender: "male",
//         phone: "+1234567891",
//         isLookingForAccommodation: true,
//         university: "State University",
//         bio: "Engineering student, loves cooking and gaming. Looking for roommates who share similar interests.",
//         createdAt: new Date("2024-01-20"),
//       },
//       {
//         id: "3",
//         name: "Emma Rodriguez",
//         email: "emma.r@university.edu",
//         gender: "female",
//         phone: "+1234567892",
//         isLookingForAccommodation: false,
//         university: "State University",
//         createdAt: new Date("2024-01-10"),
//       },
//       {
//         id: "4",
//         name: "Alex Thompson",
//         email: "alex.t@university.edu",
//         gender: "male",
//         phone: "+1234567893",
//         isLookingForAccommodation: true,
//         university: "State University",
//         bio: "Business major, early riser, and fitness enthusiast. Prefer a place close to campus.",
//         createdAt: new Date("2024-01-25"),
//       },
//     ];

//     const sampleListings = [
//       {
//         id: "1",
//         userId: "3",
//         title: "Spacious 2BR Apartment Near Campus",
//         location: "University District, 0.5 miles from campus",
//         university: "State University",
//         rent: 800,
//         genderPreference: "female",
//         availableFrom: "2024-02-01",
//         description:
//           "Beautiful apartment with modern amenities, fully furnished common areas, and great natural light. Perfect for serious students.",
//         contactEmail: "emma.r@university.edu",
//         contactWhatsApp: "+1234567892",
//         amenities: ["WiFi", "Laundry", "Parking", "Furnished"],
//         roomType: "private",
//         createdAt: new Date("2024-01-15"),
//         user: sampleUsers[2],
//       },
//       {
//         id: "2",
//         userId: "5",
//         title: "Cozy Studio with Kitchen Access",
//         location: "Downtown, 1.2 miles from campus",
//         university: "State University",
//         rent: 650,
//         genderPreference: "any",
//         availableFrom: "2024-02-15",
//         description:
//           "Quiet neighborhood, great for students who prefer a peaceful environment. Bus stop right outside.",
//         contactEmail: "john.d@university.edu",
//         amenities: ["WiFi", "Kitchen Access", "Utilities Included"],
//         roomType: "private",
//         createdAt: new Date("2024-01-18"),
//       },
//       {
//         id: "3",
//         userId: "6",
//         title: "Shared Room in 3BR House",
//         location: "Riverside Area, 0.8 miles from campus",
//         university: "Tech Institute",
//         rent: 450,
//         genderPreference: "male",
//         availableFrom: "2024-03-01",
//         description:
//           "Great house with friendly roommates. Large backyard, parking available. Perfect for social students.",
//         contactEmail: "david.w@university.edu",
//         contactWhatsApp: "+1234567894",
//         amenities: ["WiFi", "Parking", "Backyard", "Laundry"],
//         roomType: "shared",
//         createdAt: new Date("2024-01-20"),
//       },
//       {
//         id: "4",
//         userId: "7",
//         title: "Modern Apartment with Study Room",
//         location: "Medical District, 0.3 miles from campus",
//         university: "Medical College",
//         rent: 900,
//         genderPreference: "any",
//         availableFrom: "2024-02-20",
//         description:
//           "Perfect for medical students. Quiet environment, dedicated study spaces, and close to hospital.",
//         contactEmail: "lisa.m@medcollege.edu",
//         contactWhatsApp: "+1234567895",
//         amenities: [
//           "WiFi",
//           "Study Room",
//           "Parking",
//           "Furnished",
//           "Utilities Included",
//         ],
//         roomType: "private",
//         createdAt: new Date("2024-01-22"),
//       },
//       {
//         id: "5",
//         userId: "8",
//         title: "Budget-Friendly Room for Engineering Students",
//         location: "Engineering Quarter, 0.7 miles from campus",
//         university: "Tech Institute",
//         rent: 550,
//         genderPreference: "male",
//         availableFrom: "2024-03-15",
//         description:
//           "Great for engineering students. Close to labs and library. Shared common areas with other students.",
//         contactEmail: "mark.t@techinstitute.edu",
//         amenities: ["WiFi", "Laundry", "Kitchen Access", "Near Library"],
//         roomType: "private",
//         createdAt: new Date("2024-01-25"),
//       },
//     ];
//      setUser(null); // or sampleUsers[0] if you want a default user
//     setSeekers(sampleUsers.filter(u => u.isLookingForAccommodation));
//     setListings(sampleListings);

//     // Save to localStorage
//     localStorage.setItem('user', JSON.stringify(null));
//     localStorage.setItem('seekers', JSON.stringify(sampleUsers.filter(u => u.isLookingForAccommodation)));
//     localStorage.setItem('listings', JSON.stringify(sampleListings));
//   }
// }, []);
useEffect(() => {
  const sampleSeekers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      gender: "female",
      phone: "+1234567890",
      isLookingForAccommodation: true,
      university: "State University",
      bio: "Third-year Computer Science student looking for a quiet place to study. Non-smoker, clean, and respectful.",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@university.edu",
      gender: "male",
      phone: "+1234567891",
      isLookingForAccommodation: true,
      university: "State University",
      bio: "Engineering student, loves cooking and gaming. Looking for roommates who share similar interests.",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex.t@university.edu",
      gender: "male",
      phone: "+1234567893",
      isLookingForAccommodation: true,
      university: "State University",
      bio: "Business major, early riser, and fitness enthusiast. Prefer a place close to campus.",
      createdAt: new Date("2024-01-25"),
    },
  ];

  const sampleListings = [
      {
        id: "1",
        userId: "3",
        title: "Spacious 2BR Apartment Near Campus",
        location: "University District, 0.5 miles from campus",
        university: "State University",
        rent: 800,
        genderPreference: "female",
        availableFrom: "2024-02-01",
        description:
          "Beautiful apartment with modern amenities, fully furnished common areas, and great natural light. Perfect for serious students.",
        contactEmail: "emma.r@university.edu",
        contactWhatsApp: "+1234567892",
        amenities: ["WiFi", "Laundry", "Parking", "Furnished"],
        roomType: "private",
        createdAt: new Date("2024-01-15"),
        user: sampleSeekers[2],
      },
      {
        id: "2",
        userId: "5",
        title: "Cozy Studio with Kitchen Access",
        location: "Downtown, 1.2 miles from campus",
        university: "State University",
        rent: 650,
        genderPreference: "any",
        availableFrom: "2024-02-15",
        description:
          "Quiet neighborhood, great for students who prefer a peaceful environment. Bus stop right outside.",
        contactEmail: "john.d@university.edu",
        amenities: ["WiFi", "Kitchen Access", "Utilities Included"],
        roomType: "private",
        createdAt: new Date("2024-01-18"),
      },
      {
        id: "3",
        userId: "6",
        title: "Shared Room in 3BR House",
        location: "Riverside Area, 0.8 miles from campus",
        university: "Tech Institute",
        rent: 450,
        genderPreference: "male",
        availableFrom: "2024-03-01",
        description:
          "Great house with friendly roommates. Large backyard, parking available. Perfect for social students.",
        contactEmail: "david.w@university.edu",
        contactWhatsApp: "+1234567894",
        amenities: ["WiFi", "Parking", "Backyard", "Laundry"],
        roomType: "shared",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "4",
        userId: "7",
        title: "Modern Apartment with Study Room",
        location: "Medical District, 0.3 miles from campus",
        university: "Medical College",
        rent: 900,
        genderPreference: "any",
        availableFrom: "2024-02-20",
        description:
          "Perfect for medical students. Quiet environment, dedicated study spaces, and close to hospital.",
        contactEmail: "lisa.m@medcollege.edu",
        contactWhatsApp: "+1234567895",
        amenities: [
          "WiFi",
          "Study Room",
          "Parking",
          "Furnished",
          "Utilities Included",
        ],
        roomType: "private",
        createdAt: new Date("2024-01-22"),
      },
      {
        id: "5",
        userId: "8",
        title: "Budget-Friendly Room for Engineering Students",
        location: "Engineering Quarter, 0.7 miles from campus",
        university: "Tech Institute",
        rent: 550,
        genderPreference: "male",
        availableFrom: "2024-03-15",
        description:
          "Great for engineering students. Close to labs and library. Shared common areas with other students.",
        contactEmail: "mark.t@techinstitute.edu",
        amenities: ["WiFi", "Laundry", "Kitchen Access", "Near Library"],
        roomType: "private",
        createdAt: new Date("2024-01-25"),
      },
    ];

  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
  const savedListings = localStorage.getItem('listing');
  if (savedListings) {
    setUser(JSON.parse(savedListings));
  }

  // Set sample data immediately for presentation
  setSeekers(sampleSeekers);
  setSeekers(sampleListings);

  const fetchRealData = async () => {
    try {
      const { data } = await API.get('/users');
      setSeekers(data); // replace with real data
    } catch (err) {
      console.warn('⚠️ Using fallback sample data due to fetch error.');
    }
  };

  fetchRealData();

  const fetchListings = async () => {
  try {
    const { data } = await API.get('/listings');
    setListings(data);
  } catch (err) {
    console.warn('⚠️ Using fallback sample listings due to fetch error.');
  }
};

fetchListings();

}, []);


  //   setSeekers((prev) => {
  //     const others = prev.filter((s) => s.id !== user.id);
  //     if (updates.isLookingForAccommodation) {
  //       return [...others, { ...user, ...updates }];
  //     } else {
  //       return others;
  //     }
  //   });
  //   setListings(sampleListings);
  // }, []);

  useEffect(() => {
  localStorage.setItem('user', JSON.stringify(user));
}, [user]);

useEffect(() => {
  localStorage.setItem('listings', JSON.stringify(listings));
}, [listings]);

useEffect(() => {
  localStorage.setItem('seekers', JSON.stringify(seekers));
}, [seekers]);


  const addListing = async (listingData) => {
  try {
    const res = await axios.post("http://localhost:5000/api/listings", listingData);
    setListings((prev) => [res.data.listing, ...prev]);
  } catch (error) {
    console.error("Failed to add listing:", error);
  }
};

  const updateUser = async (updates) => {
  if (!user) return;

  try {
    const updatedUser = { ...user, ...updates };

    const { data } = await API.post('/users', updatedUser); // sends to backend

    setUser(data.user);

    if ("isLookingForAccommodation" in updatedUser) {
      setSeekers((prev) => {
        const filtered = prev.filter((s) => s.email !== updatedUser.email);
        return updatedUser.isLookingForAccommodation
          ? [...filtered, updatedUser]
          : filtered;
      });
    }
  } catch (err) {
    console.error("Failed to update user:", err);
    alert("Something went wrong while updating user data.");
  }
};


  const removeListing = (id) => {
    setListings((prev) => prev.filter((listing) => listing._id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        listings,
        setListings,
        seekers,
        setSeekers,
        addListing,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
