const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// GET /api/leads?search=&stage=&sortBy=&page=&limit=
router.get("/", async (req, res) => {
  try {
    const { search, stage, sortBy, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (stage) {
      query.stage = stage;
    }

    const leads = await Lead.find(query)
      .sort(sortBy ? { [sortBy]: 1 } : { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      total,
      leads
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/leads/:id
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
