const crypto = require("crypto"); 
const User = require("../models/User");
const { Op } = require("sequelize");

const generateCode = async (req, res) => {
  try {
    const code = crypto.randomInt(100000, 1000000).toString();
    const expires_at = new Date(Date.now() + 15 * 60 * 1000);

    await User.update(
      { pairing_code: code, pairing_code_expires_at: expires_at },
      { where: { id: req.user.id } }
    );

    return res.status(201).json({ code, expires_at });

  } catch (error) {

    console.error("Sequelize Error:", {
      name: error.name,
      message: error.message,
      errors: error.errors || [],
    });

    return res.status(500).json({ error: "Failed to generate code" });
  }
};

const pairWithCode = async (req, res) => {
  let { enteredCode } = req.body;
  const codeOwner = await User.findOne({ where: { pairing_code: enteredCode } });

  if (!codeOwner) {
    return res.status(400).json({ error: "Invalid code." });
  }

  //check if code is expired
  if (codeOwner.pairing_code_expires_at < new Date()) {
    await codeOwner.update(
      { pairing_code: null, pairing_code_expires_at: null },
    );
    return res.status(400).json({ error: "The code you've entered is expired." });
  }

  //check if user entered their own code
  if (codeOwner.id === req.user.id) {
    return res.status(400).json({ error: "Cannot pair with your own account." });
  }

  const currUser = await User.findByPk(req.user.id);

  //might not be necessary but just to be safe
  if (codeOwner.partner_id || currUser.partner_id) {
      return res.status(400).json({ error: "One of the users is already paired." });
  }
    
  const t = await sequelize.transaction();
  try {
    codeOwner.partner_id = currUser.id;
    currUser.partner_id = codeOwner.id;

    await codeOwner.save({ transaction: t });
    await currUser.save({ transaction: t });

    await User.update(
      { pairing_code: null, pairing_code_expires_at: null },
      { where: { id: { [Op.in]: [codeOwner.id, currUser.id] } }, transaction: t }
    );

    await t.commit();
    console.log("Users paired successfully!")
    res.status(201).json({ partnerUsername: codeOwner.username });

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: "Failed to pair users." });
  }
};

module.exports = { generateCode, pairWithCode };