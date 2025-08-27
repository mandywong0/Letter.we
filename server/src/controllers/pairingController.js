const crypto = require("crypto"); 

const generateCode = async (req, res) => {
  try {
    //generate code
    const code = crypto.randomInt(100000, 1000000).toString();
    //store code
      //make sure code doesn't already exist in db
    //send code

  } catch (error) {

  }
};

module.exports = { generateCode };