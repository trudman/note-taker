const router = require("express").Router();
// const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});




module.exports = router;
