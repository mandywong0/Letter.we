const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "partner_id"],
      include: [
        {
          model: User,
          as: "partner",
          attributes: ["id", "username"] // may add profile pic in the future
        }
      ]
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCurrentUser };
