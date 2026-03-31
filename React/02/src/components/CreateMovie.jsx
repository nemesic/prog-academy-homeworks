import { useState } from "react";


function CreateMovie({ onAddMovie }) {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !img) return;

    const newMovie = {
      id: Date.now(),
      title,
      img,
    };

    onAddMovie(newMovie);

    setTitle("");
    setImg("");
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>ADD NEW MOVIE</h3>

      <input
        type="text"
        required
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        required
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />

      <button type="submit">ADD MOVIE</button>
    </form>
  );
}

export default CreateMovie;