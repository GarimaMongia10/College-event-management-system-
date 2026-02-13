const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/event");
const User = require("./models/user");

dotenv.config();

// Sample image with gradient (SVG converted to data URL)
const sampleImages = [
  // Tech Conference - Blue gradient
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(100,150,200);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(50,100,150);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g1)'/%3E%3Ctext x='50%25' y='50%25' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3ETech Conference 2026%3C/text%3E%3C/svg%3E",
  
  // Summer Festival - Orange gradient
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(255,165,0);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(255,69,0);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g2)'/%3E%3Ctext x='50%25' y='50%25' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3ESummer Festival%3C/text%3E%3C/svg%3E",
  
  // Sports Day - Green gradient
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(34,139,34);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(0,100,0);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g3)'/%3E%3Ctext x='50%25' y='50%25' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EAnnual Sports Day%3C/text%3E%3C/svg%3E",
  
  // Workshop - Purple gradient
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:rgb(138,43,226);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgb(75,0,130);stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g4)'/%3E%3Ctext x='50%25' y='50%25' font-size='40' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'%3EWeb Dev Workshop%3C/text%3E%3C/svg%3E",
];

const sampleEvents = [
  {
    title: "Tech Conference 2026",
    description: "Join us for an exciting tech conference featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
    date: new Date("2026-03-15"),
    location: "Convention Center, Downtown",
    image: sampleImages[0],
  },
  {
    title: "Summer Festival",
    description: "Celebrate summer with music, food, games, and entertainment. Families welcome!",
    date: new Date("2026-06-20"),
    location: "Central Park",
    image: sampleImages[1],
  },
  {
    title: "Annual Sports Day",
    description: "Compete in various sports activities including basketball, volleyball, badminton, and track events.",
    date: new Date("2026-04-10"),
    location: "Sports Complex",
    image: sampleImages[2],
  },
  {
    title: "Web Development Workshop",
    description: "Learn modern web development with React, Node.js, and MongoDB. Perfect for beginners to intermediate developers.",
    date: new Date("2026-03-25"),
    location: "Tech Hub, Building A",
    image: sampleImages[3],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing events
    await Event.deleteMany({});
    console.log("Cleared existing events");

    // Get a user to assign as creator (or create one)
    let user = await User.findOne({ role: "Admin" });
    if (!user) {
      user = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "hashed_password",
        role: "Admin"
      });
      console.log("Created admin user");
    }

    // Add createdBy to events and save
    const eventsWithCreator = sampleEvents.map(event => ({
      ...event,
      createdBy: user._id
    }));

    const createdEvents = await Event.insertMany(eventsWithCreator);
    console.log(`Created ${createdEvents.length} sample events with images`);

    mongoose.connection.close();
    console.log("Seeding completed successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
