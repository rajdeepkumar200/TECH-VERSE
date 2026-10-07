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
      teamMembers,
      teamSize,
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

    const cleanedMembers = Array.isArray(teamMembers)
      ? teamMembers.map((m) => ({
          name: m.name ? String(m.name).trim() : "",
          course: m.course ? String(m.course).trim() : "",
          regNo: m.regNo ? String(m.regNo).trim() : "",
        }))
      : [];

    const computedTeamSize = Number(teamSize) || (cleanedMembers.length + 1);

    const leaderNameClean = (req.body.leaderName || name).trim().replace(/\(Leader\)/g, "").trim();
    const leaderCourseClean = (req.body.leaderCourse || course).trim().replace(/\(Leader\)/g, "").trim();
    const leaderRegNoClean = (req.body.leaderRegNo || regNo).trim().replace(/\(Leader\)/g, "").trim();

    const m2 = cleanedMembers[0] || {};
    const m3 = cleanedMembers[1] || {};
    const m4 = cleanedMembers[2] || {};
    const m5 = cleanedMembers[3] || {};

    const regData = {
      // Participant 1 (Team Leader)
      name: leaderNameClean,
      course: leaderCourseClean,
      regNo: leaderRegNoClean,
      contactNo: cleanContact,
      competition: competition.trim(),
      eventSlug: eventSlug ? eventSlug.toLowerCase().trim() : cleanSlug,
      teamSize: computedTeamSize,
      leaderName: leaderNameClean,

      // Dedicated Participant 2 fields
      member2_name: req.body.member2_name ? String(req.body.member2_name).trim() : (m2.name || ""),
      member2_course: req.body.member2_course ? String(req.body.member2_course).trim() : (m2.course || ""),
      member2_regNo: req.body.member2_regNo ? String(req.body.member2_regNo).trim() : (m2.regNo || ""),

      // Dedicated Participant 3 fields
      member3_name: req.body.member3_name ? String(req.body.member3_name).trim() : (m3.name || ""),
      member3_course: req.body.member3_course ? String(req.body.member3_course).trim() : (m3.course || ""),
      member3_regNo: req.body.member3_regNo ? String(req.body.member3_regNo).trim() : (m3.regNo || ""),

      // Dedicated Participant 4 fields
      member4_name: req.body.member4_name ? String(req.body.member4_name).trim() : (m4.name || ""),
      member4_course: req.body.member4_course ? String(req.body.member4_course).trim() : (m4.course || ""),
      member4_regNo: req.body.member4_regNo ? String(req.body.member4_regNo).trim() : (m4.regNo || ""),

      // Dedicated Participant 5 fields
      member5_name: req.body.member5_name ? String(req.body.member5_name).trim() : (m5.name || ""),
      member5_course: req.body.member5_course ? String(req.body.member5_course).trim() : (m5.course || ""),
      member5_regNo: req.body.member5_regNo ? String(req.body.member5_regNo).trim() : (m5.regNo || ""),

      // Complete Structured array for all participants
      participants: [
        {
          name: leaderNameClean,
          course: leaderCourseClean,
          regNo: leaderRegNoClean,
          role: computedTeamSize > 1 ? "Team Leader" : "Participant",
        },
        ...cleanedMembers.map((m, idx) => ({
          name: m.name,
          course: m.course,
          regNo: m.regNo,
          role: `Teammate ${idx + 2}`,
        })),
      ],
      teamMembers: cleanedMembers,
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

// Get stats for all events
const getEventStats = async (req, res) => {
  try {
    const breakdown = [];
    let total = 0;
    const seenCollections = new Set();

    for (const [slug, collectionName] of Object.entries(EVENT_COLLECTION_MAP)) {
      if (seenCollections.has(collectionName)) continue;
      seenCollections.add(collectionName);

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
      "competition",
      "teamSize",
      "name",
      "course",
      "regNo",
      "contactNo",
      "member2_name",
      "member2_course",
      "member2_regNo",
      "member3_name",
      "member3_course",
      "member3_regNo",
      "member4_name",
      "member4_course",
      "member4_regNo",
      "member5_name",
      "member5_course",
      "member5_regNo",
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
