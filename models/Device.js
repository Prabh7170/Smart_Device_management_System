const mongoose = require("mongoose");


const DeviceSchema = new mongoose.Schema(
{
name: 
{ type: String,
 required: true,
 trim: true },

type: {
type: String,
enum: ["light", "thermostat", "lock", "meter", "camera", "other"],
default: "other",
required: true,
},

status: 
{ type: String, 
enum: ["active", "inactive", "offline"], 
default: "inactive" },

last_active_at: 
{ type: Date, default: null },

owner:
{ type: mongoose.Schema.Types.ObjectId, 
ref: "User",
required: false },
},
{ timestamps: true }
);


module.exports = mongoose.model("Device", DeviceSchema);