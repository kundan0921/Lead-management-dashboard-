const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//  IMPORTANT: ADD THIS LINE
const leadsRoutes = require("./routes/leads");

const app = express();
app.use(cors());
app.use(express.json());



//// Connect to MongoDB////
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));

// Use Leads API
app.use("/api/leads", leadsRoutes);

app.get("/", (req, res) => {
  res.send("Lead CRM Backend is running");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
