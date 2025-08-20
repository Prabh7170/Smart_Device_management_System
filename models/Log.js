const mongoose2 = require("mongoose");


const LogSchema = new mongoose2.Schema(
{
device: { type: mongoose2.Schema.Types.ObjectId, ref: "Device", required: true },
event: { type: String, required: true, trim: true },
value: { type: Number, default: null },
timestamp: { type: Date, default: Date.now },
},
{ timestamps: true }
);


module.exports = mongoose2.model("Log", LogSchema);