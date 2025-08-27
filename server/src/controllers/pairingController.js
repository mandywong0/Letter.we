const crypto = require("crypto"); 

const generateCode = async (req, res) => {
  let code;
  let newCode;
  let success = false;

  for (let tries = 0; tries < 5 && !success; tries++) {
    code = crypto.randomInt(100000, 1000000).toString();
    try {
      newCode = await PairingCode.create({
        code,
        user_id: req.user.id,
        expires_at: new Date(Date.now() + 15 * 60 * 1000),
      });
      success = true;
    } catch (error) {
      console.error(error);
    }
  }
  if (!success) {
    return res.status(500).json({ error: "Failed to generate code" });
  }
  return res.status(201).json({ code, expires_at });
};

module.exports = { generateCode };