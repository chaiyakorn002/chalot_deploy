// routes/checkin.js
const express = require('express');
const router = express.Router();
const Checkin = require('../models/Checkin');
const authMiddleware = require('../middlewares/auth'); // Middleware สำหรับการตรวจสอบการรับรองตัวตน

// POST /checkin - สำหรับบันทึก Checkin
router.post('/', authMiddleware, async (req, res) => {
  const { userId, time, image, location } = req.body;

  try {
    const checkin = new Checkin({
      userId,
      time,
      image,
      location: {
        type: 'Point',
        coordinates: location,
      },
    });

    const savedCheckin = await checkin.save();
    res.status(201).json(savedCheckin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึก Checkin' });
  }
});

module.exports = router;