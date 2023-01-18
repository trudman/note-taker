const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);

let notesArr = [];

router.get("/", (req, res) => {
  readFromFile("./db/db.json")
    .then(JSON.parse)
    .then((data) => res.json(data));
});

router.post("/", (req, res) => {
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
      res.status(200).json(notesArr);
    });
  });
});

router.delete("/:id", (req, res) => {
  let noteID = JSON.parse(fs.readFileSync("./db/db.json"));
  let delNote = noteID.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  console.log("Deleted");
  res.json(delNote);
});

module.exports = router;

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const deleted = notesArr.find((notesArr) => notesArr.id == id);
//   if (deleted) {
//     notesArr = notesArr.filter((notesArr) => notesArr.id !== id);
//     fs.writeFile("./db/db.json"),
//       JSON.stringify(notesArr),
//       "utf-8",
//       (err) => {
//         if (err) throw err;
//         console.log("Saved");
//         res.status(200).json(notesArr);
//       };
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });
