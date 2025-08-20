
const Log = require("../models/Log");
const Device2 = require("../models/Device");
const parseRange = require("../utils/parseRange");

async function ensureOwnership(req, deviceId) {
  const device = await Device2.findById(deviceId);
  if (!device) return { ok: false, code: 404, msg: "Device not found" };
  if (String(device.owner) !== String(req.user.id) && req.user.role !== "admin") {
    return { ok: false, code: 403, msg: "Forbidden" };
  }
  return { ok: true, device };
}

exports.createLog = async (req, res) => {
  try {
    const { id } = req.params; // device id
    const { event, value } = req.body;
    if (!event) return res.status(400).json({ success: false, message: "event is required" });

    const check = await ensureOwnership(req, id);
    if (!check.ok) return res.status(check.code).json({ success: false, message: check.msg });

    const log = await Log.create({ device: id, event, value: value ?? null });
    res.status(201).json({
      success: true,
      log: { id: log._id, event: log.event, value: log.value, timestamp: log.timestamp },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create log" });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const { id } = req.params; // device id
    const limit = Math.min(parseInt(req.query.limit || "10", 10), 100);

    const check = await ensureOwnership(req, id);
    if (!check.ok) return res.status(check.code).json({ success: false, message: check.msg });

    const logs = await Log.find({ device: id })
      .sort({ timestamp: -1 })
      .limit(limit);

    res.json({
      success: true,
      logs: logs.map((l) => ({ id: l._id, event: l.event, value: l.value, timestamp: l.timestamp })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch logs" });
  }
};

exports.getUsage = async (req, res) => {
  try {
    const { id } = req.params; // device id
    const { range = "24h" } = req.query;
    const since = parseRange(range);

    const check = await ensureOwnership(req, id);
    if (!check.ok) return res.status(check.code).json({ success: false, message: check.msg });

    // Aggregate sum of `value` for logs with event === 'units_consumed' in range
    const [{ total = 0 } = {}] = await Log.aggregate([
      { $match: { device: new Device2.Types.ObjectId(id), event: "units_consumed", timestamp: { $gte: since } } },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]);

    res.json({ success: true, device_id: id, total_units_last_24h: total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to compute usage" });
  }
};


