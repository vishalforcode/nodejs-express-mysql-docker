const App = require("../models/app.model.js");

// Create and Save a new App
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a App
  const app = new App({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Apps in the database
  App.create(app, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the App."
      });
    else res.send(data);
  });
};

// Retrieve all Apps from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  App.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving apps."
      });
    else res.send(data);
  });
};

// Find a single App by Id
exports.findOne = (req, res) => {
  App.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found App with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving App with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published app
exports.findAllPublished = (req, res) => {
  App.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving app."
      });
    else res.send(data);
  });
};

// Update a App identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  App.updateById(
    req.params.id,
    new App(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found App with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating App with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a App with the specified id in the request
exports.delete = (req, res) => {
  App.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found App with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete App with id " + req.params.id
        });
      }
    } else res.send({ message: `App was deleted successfully!` });
  });
};

// Delete all apps from the database.
exports.deleteAll = (req, res) => {
  App.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Apps."
      });
    else res.send({ message: `All Apps were deleted successfully!` });
  });
};
