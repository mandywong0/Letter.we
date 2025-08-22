const Letter = require('../models/Letter');

//for POST letter
const mailLetter = async (req, res) => {
  try {

    let { content } = req.body.trim();
    const senderID = req.user.id;
    const recipientID = 1; //change to paired partner later

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

    res.status(201).json(letter);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getLetters = async (req, res) => {
  try {
    const userID = req.user.id;
    const letters = await Letter.find({ recipientId: userID }).sort({ sentAt: -1 });

    res.json({ success: true, letters });

  } catch {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { mailLetter, getLetters };