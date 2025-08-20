



const Device = require("../models/Device");

function canModify(reqUser, device) {
  if (!reqUser) return false;
  return (
    String(device.owner) === String(reqUser.id) ||
    reqUser.role === "admin" // assuming you have an admin role in your users
  );
}

exports.registerDevice = async (req, res) => {
  try {
    const { name, type, status } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "name is required" });

    const device = await Device.create({
      name,
      type: type || "other",
      status: status || "inactive",
      owner: req.user ? req.user.id : null,
    });

    res.status(201).json({
      success: true,
      device: {
        id: device._id,
        name: device.name,
        type: device.type,
        status: device.status,
        last_active_at: device.last_active_at,
        owner_id: device.owner,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to register device" });
  }
};

exports.listDevices = async (req, res) => {
  try {
    const { type, status, mine } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (mine === "1") filter.owner = req.user.id; // optional: list only my devices

    const devices = await Device.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      devices: devices.map((d) => ({
        id: d._id,
        name: d.name,
        type: d.type,
        status: d.status,
        last_active_at: d.last_active_at,
        owner_id: d.owner,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to list devices" });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    ["name", "type", "status"].forEach((k) => {
      if (req.body[k] !== undefined) updates[k] = req.body[k];
    });

    const device = await Device.findById(id);
    if (!device) return res.status(404).json({ success: false, message: "Device not found" });
    if (!canModify(req.user, device))
      return res.status(403).json({ success: false, message: "Forbidden" });

    Object.assign(device, updates);
    await device.save();
    res.json({
      success: true,
      device: {
        id: device._id,
        name: device.name,
        type: device.type,
        status: device.status,
        last_active_at: device.last_active_at,
        owner_id: device.owner,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update device" });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);
    if (!device) return res.status(404).json({ success: false, message: "Device not found" });
    if (!canModify(req.user, device))
      return res.status(403).json({ success: false, message: "Forbidden" });

    await device.deleteOne();
    res.json({ success: true, message: "Device removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete device" });
  }
};

exports.heartbeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};
    const device = await Device.findById(id);
    if (!device) return res.status(404).json({ success: false, message: "Device not found" });
    // Owner or admin only to post heartbeat (adjust if devices self-report)
    if (!canModify(req.user, device))
      return res.status(403).json({ success: false, message: "Forbidden" });

    if (status) device.status = status;
    device.last_active_at = new Date();
    await device.save();

    res.json({ success: true, message: "Device heartbeat recorded", last_active_at: device.last_active_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to record heartbeat" });
  }
};


