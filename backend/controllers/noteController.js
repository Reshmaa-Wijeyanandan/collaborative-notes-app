import Note from "../models/Note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      owner: req.user.id
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET ALL NOTES
export const getNotes = async (req, res) => {

  try {

    const notes = await Note.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// UPDATE NOTE
export const updateNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();

    res.json(updatedNote);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// DELETE NOTE
export const deleteNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


// SEARCH NOTES
export const searchNotes = async (req, res) => {

  try {

    const { query } = req.query;

    const notes = await Note.find({
      $text: { $search: query }
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};