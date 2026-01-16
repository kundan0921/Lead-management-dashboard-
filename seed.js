const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const Lead = require("./models/Lead");

mongoose.connect(process.env.MONGO_URI);

async function seedLeads() {
  let leads = [];

  for (let i = 0; i < 500; i++) {
    leads.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      company: faker.company.name(),
      stage: ["New", "Contacted", "Qualified", "Converted", "Lost"][
        Math.floor(Math.random() * 5)
      ],
      source: ["LinkedIn", "Website", "Referral", "Email"][
        Math.floor(Math.random() * 4)
      ]
    });
  }

  await Lead.insertMany(leads);
  console.log("500 Leads Seeded Successfully!");
  process.exit();
}

seedLeads();
