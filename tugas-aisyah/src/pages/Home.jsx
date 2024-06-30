// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

export default function Home() {
  const initialFilms = [
    {
      id: 1,
      title: "Ada Apa dengan Cinta?",
      genre: "Drama, Romance",
      director: "Rudi Soedjarwo",
    },
    {
      id: 2,
      title: "Laskar Pelangi",
      genre: "Drama",
      director: "Riri Riza",
    },
    {
      id: 3,
      title: "Gie",
      genre: "Biography, Drama",
      director: "Riri Riza",
    },
    {
      id: 4,
      title: "Pengabdi Setan",
      genre: "Horror",
      director: "Joko Anwar",
    },
    {
      id: 5,
      title: "AADC 2",
      genre: "Drama, Romance",
      director: "Riri Riza",
    },
  ];

  const [films, setFilms] = useState(initialFilms);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newFilm, setNewFilm] = useState({
    id: "",
    title: "",
    genre: "",
    director: "",
  });

  useEffect(() => {
    const storedFilms = JSON.parse(localStorage.getItem("films"));
    if (storedFilms) {
      setFilms(storedFilms);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("films", JSON.stringify(films));
  }, [films]);

  const handleShowEdit = (film) => {
    setNewFilm(film);
    setShowEdit(true);
  };

  const handleAddFilm = (e) => {
    e.preventDefault();
    const updatedFilms = [...films, { ...newFilm, id: films.length + 1 }];
    setFilms(updatedFilms);
    setNewFilm({ id: "", title: "", genre: "", director: "" });
    setShowAdd(false);
  };

  const handleEditFilm = (e) => {
    e.preventDefault();
    const updatedFilms = films.map((film) =>
      film.id === newFilm.id ? { ...newFilm } : film
    );
    setFilms(updatedFilms);
    setShowEdit(false);
    setNewFilm({ id: "", title: "", genre: "", director: "" });
  };

  const handleDeleteFilm = (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus film ini?"
    );
    if (confirmed) {
      const updatedFilms = films.filter((film) => film.id !== id);
      setFilms(updatedFilms);
    }
  };

  const sortedFilms = films.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  });

  const filteredFilms = sortedFilms.filter((film) =>
    film.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowAdd(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Tambah Film
          </button>
          <input
            type="text"
            placeholder="Cari film..."
            className="block w-1/2 p-3 border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <label htmlFor="sortby" className="mr-2 font-medium text-gray-800">Urutkan berdasarkan:</label>
            <select
              id="sortby"
              className="border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">Normal</option>
              <option value="title">Judul</option>
              <option value="genre">Genre</option>
              <option value="director">Direktur</option>
            </select>
            <select
              className="ml-2 border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <div key={film.id} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800">{film.title}</p>
              <p className="text-sm text-gray-600">Genre: {film.genre}</p>
              <p className="text-sm text-gray-600">Direktur: {film.director}</p>
              <div className="mt-2 flex justify-end">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() => handleShowEdit(film)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleDeleteFilm(film.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">Tidak ada film yang cocok dengan pencarian Anda.</p>
        )}
      </div>

      {showAdd && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah Film Baru</h2>
            <form onSubmit={handleAddFilm}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul:</label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.title}
                  onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                <input
                  type="text"
                  id="genre"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.genre}
                  onChange={(e) => setNewFilm({ ...newFilm, genre: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="director" className="block text-sm font-medium text-gray-700">Direktur:</label>
                <input
                  type="text"
                  id="director"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.director}
                  onChange={(e) => setNewFilm({ ...newFilm, director: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setShowAdd(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Film</h2>
            <form onSubmit={handleEditFilm}>
              <div className="mb-4">
                <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Judul:</label>
                <input
                  type="text"
                  id="edit-title"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.title}
                  onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                <input
                  type="text"
                  id="edit-genre"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.genre}
                  onChange={(e) => setNewFilm({ ...newFilm, genre: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-director" className="block text-sm font-medium text-gray-700">Direktur:</label>
                <input
                  type="text"
                  id="edit-director"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                  value={newFilm.director}
                  onChange={(e) => setNewFilm({ ...newFilm, director: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setShowEdit(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
