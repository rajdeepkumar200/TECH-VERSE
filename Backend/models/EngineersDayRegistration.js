const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    trim: true,
  },
  regNo: {
    type: String,
    required: [true, "Registration number is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
    match: [/^\d{10}$/, "Contact number must be exactly 10 digits"],
  },
  competition: {
    type: String,
    required: [true, "Competition is required"],
    trim: true,
  },
  eventSlug: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Clean short collection names without "engineersday_" prefix
const EVENT_COLLECTION_MAP = {
  "quiz": "quiz",
  "3-wheel": "3wheel",
  "meme-making": "mememaking",
  "minecraft-codm": "minecraft_codm",
  "bgmi": "bgmi",
  "ai-imposter": "ai_imposter",
  "prompt-engineering": "prompt_engineering",
  "poster-making": "poster_making",
  "autocad-civil": "autocad_civil",
  "autocad-mechanical": "autocad_mechanical",
  "bridge-making": "bridge_making",
  "best-out-of-waste": "best_out_of_waste",
};

/**
 * Returns the dedicated Mongoose Model for a given event's collection.
 */
const getEventModel = (slug) => {
  const normalizedSlug = slug ? slug.toLowerCase().trim() : "other";
  const collectionName = EVENT_COLLECTION_MAP[normalizedSlug] || normalizedSlug.replace(/[^a-z0-9_]/g, "_");
  const modelName = `Event_${collectionName}`;

  if (mongoose.models[modelName]) {
    return mongoose.models[modelName];
  }
  return mongoose.model(modelName, RegistrationSchema, collectionName);
};

module.exports = {
  RegistrationSchema,
  EVENT_COLLECTION_MAP,
  getEventModel,
};
