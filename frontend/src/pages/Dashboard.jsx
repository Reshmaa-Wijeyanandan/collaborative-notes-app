import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import API from "../services/api";

function Dashboard() {

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const searchNotes = async () => {

    if (!search) {
        fetchNotes();
        return;
    }

    const res = await API.get(`/notes/search?query=${search}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });

    setNotes(res.data);

  };

  const fetchNotes = async () => {

    const res = await API.get("/notes", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setNotes(res.data);

  };

  const createNote = async (e) => {

    e.preventDefault();

    await API.post("/notes",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTitle("");
    setContent("");

    fetchNotes();
  };

  const deleteNote = async (id) => {

    await API.delete(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchNotes();

  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (

    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6">
            My Notes
        </h1>
        <button
            onClick={logout}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
      </div>
      <div className="mb-6">

        <input
            placeholder="Search notes..."
            className="border p-2 mr-2"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />

        <button
            onClick={searchNotes}
            className="bg-green-600 text-white px-4 py-2"
        >
            Search
        </button>

      </div>

      <form
        onSubmit={createNote}
        className="mb-8"
      >

        <input
          placeholder="Title"
          className="border p-2 mr-2 mb-4 rounded"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <div className="mb-4">
          <ReactQuill
            placeholder="Content"
            value={content}
            onChange={setContent}
            className="bg-white"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Add
        </button>

      </form>

      <div className="grid md:grid-cols-3 gap-6">

        {notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          notes.map((note)=>(
          <div
            key={note._id}
            className="border p-4 rounded-lg bg-white shadow-md hover:shadow-lg"
          >

            <h2 className="font-bold">
              {note.title}
            </h2>

            <div
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>

            <button
              onClick={()=>deleteNote(note._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>

          </div>
        )))}

      </div>

    </div>

  );

}

export default Dashboard;