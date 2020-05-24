const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");

const port = 3000;

app.use(express.static("views"));
app.use("/assets", express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function readNotes() {
  let notes = fs.readFileSync(__dirname + "/public/notes.json", "utf8");
  return JSON.parse(notes);
}

// notes
app.get("/", (req, res) => {
  res.render("notes", { data: readNotes() });
});

// Add todo
app.post("/addNote", urlencodedParser, (req, res) => {
  let notes = readNotes();
  let newNote = { id: notes.length + 1, note: req.body.newNote };
  notes.push(newNote);
  fs.writeFileSync(__dirname + "/public/notes.json", JSON.stringify(notes));
  res.send(readNotes());
});

// update note
app.patch("/updateNote/:id", urlencodedParser, (req, res) => {
  let notes = readNotes();
  notes.map((note) => {
    if (note.id == req.params.id) {
      note.note = req.body.note;
    }
    return;
  });
  fs.writeFileSync(__dirname + "/public/notes.json", JSON.stringify(notes));
  res.send(readNotes());
});

// Delete todo
app.delete("/deleteNote/:item", urlencodedParser, (req, res) => {
  let notes = readNotes();
  let updatedNote = notes.filter((note) => {
    return note.id != req.params.item;
  });
  fs.writeFileSync(
    __dirname + "/public/notes.json",
    JSON.stringify(updatedNote)
  );
  res.send(readNotes());
});

// app listenong
app.listen(process.env.PORT || port, () => {
  console.log(`listeneing on port ${port}`);
});
