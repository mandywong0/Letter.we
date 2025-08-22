//for POST letter
const mailLetter = async (req, res) => {
  try {

    let { content } = req.body;
    const senderID = req.user.id;
    const recipientID = 1; //change to paired partner later

    //validate 

    //create a new Letter object
    const letter = await Letter.create({
        senderID,
        recipientID,
        content
    });

    res.status(201).json(letter);

  } catch {
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