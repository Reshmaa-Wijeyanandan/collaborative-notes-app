import Note from "../models/Note.js";
import User from "../models/User.js";

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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const notes = await Note.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    })
    .skip((page - 1) * limit)
    .limit(limit);

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE NOTE
export const updateNote = async (req, res) => {

  try {

    const note = await Note.findOne({
      _id: req.params.id,
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    });

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

    const note = await Note.findOne({
      _id: req.params.id,
      owner: req.user.id
    });

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
      $and: [
        { $text: { $search: query } },
        {
          $or: [
            { owner: req.user.id },
            { collaborators: req.user.id }
          ]
        }
      ]
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

export const addCollaborator = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (!note.collaborators.includes(userId)) {
      note.collaborators.push(userId);
    }

    await note.save();

    res.json({
      message: "Collaborator added",
      note
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};