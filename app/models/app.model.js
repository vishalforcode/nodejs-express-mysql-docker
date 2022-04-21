const sql = require("./db.js");

// constructor
const App = function(app) {
  this.title = app.title;
  this.description = app.description;
  this.published = app.published;
};

App.create = (newApp, result) => {
  sql.query("INSERT INTO app SET ?", newApp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created App: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newApp });
  });
};

App.findById = (id, result) => {
  sql.query(`SELECT * FROM app WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found app: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found App with the id
    result({ kind: "not_found" }, null);
  });
};

App.getAll = (title, result) => {
  let query = "SELECT * FROM app";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("apps: ", res);
    result(null, res);
  });
};

App.getAllPublished = result => {
  sql.query("SELECT * FROM app WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Apps: ", res);
    result(null, res);
  });
};

App.updateById = (id, app, result) => {
  sql.query(
    "UPDATE app SET title = ?, description = ?, published = ? WHERE id = ?",
    [app.title, app.description, app.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found App with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated app: ", { id: id, ...app });
      result(null, { id: id, ...app });
    }
  );
};

App.remove = (id, result) => {
  sql.query("DELETE FROM app WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found App with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted app with id: ", id);
    result(null, res);
  });
};

App.removeAll = result => {
  sql.query("DELETE FROM app", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} app`);
    result(null, res);
  });
};

module.exports = App;
