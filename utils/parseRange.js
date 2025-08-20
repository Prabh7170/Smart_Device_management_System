module.exports = function parseRange(rangeStr = "24h") {
const match = String(rangeStr).match(/^(\d+)([hd])$/i);
if (!match) return new Date(Date.now() - 24 * 60 * 60 * 1000); // default 24h
const amount = parseInt(match[1], 10);
const unit = match[2].toLowerCase();
const ms = unit === "h" ? amount * 60 * 60 * 1000 : amount * 24 * 60 * 60 * 1000;
return new Date(Date.now() - ms);
};