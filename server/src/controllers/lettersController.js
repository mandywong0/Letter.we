const Letter = require("../models/Letter");
const User = require("../models/User");
const { getIo } = require("../io");

//for POST letter
const mailLetter = async (req, res) => {
  try {

    let { content } = req.body;
    content = content.trim();
    const senderID = req.user.id;
    const currUser = await User.findByPk(req.user.id);
    const recipientID = currUser.partner_id;
    const io = getIo();

    //validate user input
    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ error: "Cannot send a blank letter." });
    }
    if (content.length > 2000) {
      return res.status(400).json({ error: "Letter is too long." });
    }

    //create a new Letter object
    const letter = await Letter.create({
        sender_id: senderID,
        recipient_id: recipientID,
        content
    });
    
    io.to(`user_${recipientID}`).emit("newLetter", letter);

    res.status(201).json(letter);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getLetters = async (req, res) => {
  try {
    const userID = req.user.id;
    const letters = await Letter.findAll({ 
      where: { recipient_id: userID },
      order: [['sent_at', 'DESC']]
    });

    res.json({ letters });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { mailLetter, getLetters };