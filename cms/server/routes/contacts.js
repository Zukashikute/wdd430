var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve contacts",
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    // Generate the next ID for contacts asynchronously
    const maxContactId = await sequenceGenerator.nextId("contacts");

    // Create a new contact object
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
    });

    // Save the contact to the database
    const createdContact = await contact.save();

    // Send the response after successful creation
    res.status(201).json({
      message: "Contact added successfully",
      contact: createdContact,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.description = req.body.description;
      contact.url = req.body.url;

      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

module.exports = router;
