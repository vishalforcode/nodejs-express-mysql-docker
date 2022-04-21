module.exports = app => {
  const apps = require("../controllers/app.controller.js");

  var router = require("express").Router();

  // Create a new app
  router.post("/", apps.create);

  // Retrieve all apps
  router.get("/", apps.findAll);

  // Retrieve all published apps
  router.get("/published", apps.findAllPublished);

  // Retrieve a single app with id
  router.get("/:id", apps.findOne);

  // Update a app with id
  router.put("/:id", apps.update);

  // Delete a app with id
  router.delete("/:id", apps.delete);

  // Delete all apps
  router.delete("/", apps.deleteAll);

  app.use('/api/apps', router);
};
