const {
  EVENT_COLLECTION_MAP,
  getEventModel,
} = require("../models/EngineersDayRegistration");
const { Parser } = require("json2csv");
const mongoose = require("mongoose");

// Initialize all 12 clean event collections in MongoDB
const initAllEventCollections = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const existing = (await db.listCollections().toArray()).map(c => c.name);
    const created = [];

    for (const [slug, collectionName] of Object.entries(EVENT_COLLECTION_MAP)) {
      if (!existing.includes(collectionName)) {
        await db.createCollection(collectionName);
        created.push(collectionName);
      }
    }

    res.status(200).json({
      success: true,
      message: "Event collections verified.",
      createdCollections: created,
      currentEventCollections: Object.values(EVENT_COLLECTION_MAP),
    });
  } catch (error) {
    console.error("Error initializing collections:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Register participant with exact fields: Name, Course, Reg no., contact no., competition
const registerParticipant = async (req, res) => {
  try {
    const {
      name,
      course,
      regNo,
      contactNo,
      competition,
      eventSlug,
    } = req.body;

    if (!name || !course || !regNo || !contactNo || !competition) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields: Name, Course, Reg no., contact no., and Competition.",
      });
    }

    const cleanContact = String(contactNo).trim().replace(/[\s-]/g, "");
    if (!/^\d{10}$/.test(cleanContact)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be exactly 10 digits (no more, no less).",
      });
    }

    const cleanSlug = (eventSlug || competition)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_]/g, "_");

    const regData = {
      name: name.trim(),
      course: course.trim(),
      regNo: regNo.trim(),
      contactNo: cleanContact,
      competition: competition.trim(),
      eventSlug: eventSlug ? eventSlug.toLowerCase().trim() : cleanSlug,
    };

    // Save directly to the event's dedicated collection
    const DedicatedModel = getEventModel(regData.eventSlug);
    const registration = new DedicatedModel(regData);
    await registration.save();

    const collectionName = EVENT_COLLECTION_MAP[regData.eventSlug] || regData.eventSlug;

    res.status(201).json({
      success: true,
      message: `Successfully registered for ${competition}! Saved in '${collectionName}'.`,
      collection: collectionName,
      data: registration,
    });
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred while saving registration.",
      error: error.message,
    });
  }
};

// Get registrations for a specific event
const getRegistrations = async (req, res) => {
  try {
    const { event } = req.query;

    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Please specify an event query, e.g. ?event=quiz or ?event=bgmi",
        availableEvents: Object.keys(EVENT_COLLECTION_MAP),
      });
    }

    const DedicatedModel = getEventModel(event);
    const registrations = await DedicatedModel.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      event,
      collection: EVENT_COLLECTION_MAP[event] || event,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching registrations",
      error: error.message,
    });
  }
};

// Get stats for all 12 events
const getEventStats = async (req, res) => {
  try {
    const breakdown = [];
    let total = 0;

    for (const [slug, collectionName] of Object.entries(EVENT_COLLECTION_MAP)) {
      const DedicatedModel = getEventModel(slug);
      const count = await DedicatedModel.countDocuments();
      total += count;
      breakdown.push({
        eventSlug: slug,
        collectionName,
        count,
      });
    }

    res.status(200).json({
      success: true,
      totalRegistrations: total,
      breakdown,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error calculating statistics",
      error: error.message,
    });
  }
};

// Export registrations to CSV for a given event
const exportRegistrationsCSV = async (req, res) => {
  try {
    const { event } = req.query;
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Please specify ?event=slug to export (e.g. ?event=bgmi)",
      });
    }

    const DedicatedModel = getEventModel(event);
    const data = await DedicatedModel.find().sort({ createdAt: -1 }).lean();

    const fields = [
      "_id",
      "name",
      "course",
      "regNo",
      "contactNo",
      "competition",
      "createdAt",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`${event}_registrations.csv`);
    res.send(csv);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    res.status(500).json({
      success: false,
      message: "Error generating CSV",
      error: error.message,
    });
  }
};

module.exports = {
  registerParticipant,
  getRegistrations,
  getEventStats,
  exportRegistrationsCSV,
  initAllEventCollections,
};
