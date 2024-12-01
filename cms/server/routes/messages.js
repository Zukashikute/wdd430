var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve messages",
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const maxMessageId = await sequenceGenerator.nextId("messages");
    console.log("Generated message ID:", maxMessageId);

    const messageData = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
    });

    const createdMessage = await messageData.save();

    res.status(201).json({
      message: "Message added successfully",
      messageData: createdMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

module.exports = router;
