const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);

router.get("/", (req, res) => {
  readFromFile("./db/db.json")
    .then(JSON.parse)
    .then((data) => res.json(data));
});

router.post("/", (req, res) => {
  let notesArr = [];
  let newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    notesArr = JSON.parse(data);
    notesArr.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), "utf-8", (err) => {
      if (err) throw err;
      console.log("Saved");
      res.end();
    });
  });
});

module.exports = router;
