import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},

content: {
type: String,
required: true
},

owner: {
type: mongoose.Schema.Types.ObjectId,
ref: "User"
},

collaborators: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
]
},
{ timestamps: true }
);

// enable full text search
noteSchema.index({ title: "text", content: "text" });

const Note = mongoose.model("Note", noteSchema);

export default Note;