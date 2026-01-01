// import { useEffect, useState } from "react";
// import api from "../api/axios";

// function Books() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     const res = await api.get("/books");
//     setBooks(res.data);
//   };

//   const addBook = async () => {
//     await api.post("/books", { title, author });
//     fetchBooks();
//     setTitle("");
//     setAuthor("");
//   };

//   const deleteBook = async (id) => {
//     await api.delete(`/books/${id}`);
//     fetchBooks();
//   };

//   return (
//     <div>
//       <h2>Books</h2>

//       <input
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         placeholder="Author"
//         value={author}
//         onChange={(e) => setAuthor(e.target.value)}
//       />
//       <button onClick={addBook}>Add Book</button>

//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             {book.title} - {book.author}
//             <button onClick={() => deleteBook(book.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Books;





// // function Books() {
// //   return <h1>books</h1>;
// // }

// // export default Books;

// // import { useState } from "react";
// // import "../styles/books.css";

// // function Books() {
// //   const [books, setBooks] = useState([
// //     { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
// //     { id: 2, title: "1984", author: "George Orwell" },
// //     { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
// //   ]);

// //   return (
// //     <div className="books-container">
// //       <h2>Books List</h2>
// //       <a href="/add-book" className="add-book-btn">Add Book</a>
// //       <div className="books-grid">
// //         {books.map((book) => (
// //           <div className="book-card" key={book.id}>
// //             <h3>{book.title}</h3>
// //             <p>Author: {book.author}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;


// ***********************************************************************************

import { useEffect, useState } from "react";
// import book.css for styling
import "../styles/books.css";

const API_URL = "http://localhost:3000/books";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // add | view | edit | delete

  const [selectedBook, setSelectedBook] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
  });

  /* =========================
     API CALLS
  ========================= */

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const fetchSingleBook = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  };

  const addBook = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    closeModal();
    fetchBooks();
  };

  const updateBook = async () => {
    await fetch(`${API_URL}/${selectedBook.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    closeModal();
    fetchBooks();
  };

  const deleteBook = async () => {
    await fetch(`${API_URL}/${selectedBook.id}`, {
      method: "DELETE",
    });
    closeModal();
    fetchBooks();
  };

  /* =========================
     MODAL HANDLERS
  ========================= */

  const openAddModal = () => {
    setFormData({ title: "", author: "", isbn: "" });
    setModalType("add");
    setShowModal(true);
  };

  const openViewModal = async (id) => {
    const book = await fetchSingleBook(id);
    setSelectedBook(book);
    setModalType("view");
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
    });
    setModalType("edit");
    setShowModal(true);
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setModalType("delete");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* =========================
     UI
  ========================= */

//   return (
//     <div>
//       <h2>Books</h2>

//       {/* Add Book Button */}
//       <button onClick={openAddModal}>Add Book</button>

//       {/* Books Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table border="1" cellPadding="8">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>ISBN</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.id}>
//                 <td>{book.id}</td>
//                 <td>{book.title}</td>
//                 <td>{book.author}</td>
//                 <td>{book.isbn}</td>
//                 <td>
//                   <button onClick={() => openViewModal(book.id)}>View</button>
//                   <button onClick={() => openEditModal(book)}>Edit</button>
//                   <button onClick={() => openDeleteModal(book)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* MODAL */}
//       {showModal && (
//         <div>
//           <div>
//             {modalType === "add" && (
//               <>
//                 <h3>Add Book</h3>
//                 <input
//                   placeholder="Title"
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                 />
//                 <input
//                   placeholder="Author"
//                   value={formData.author}
//                   onChange={(e) =>
//                     setFormData({ ...formData, author: e.target.value })
//                   }
//                 />
//                 <input
//                   placeholder="ISBN"
//                   value={formData.isbn}
//                   onChange={(e) =>
//                     setFormData({ ...formData, isbn: e.target.value })
//                   }
//                 />
//                 <button onClick={addBook}>Save</button>
//                 <button onClick={closeModal}>Cancel</button>
//               </>
//             )}

//             {modalType === "view" && selectedBook && (
//               <>
//                 <h3>View Book</h3>
//                 <p><b>Title:</b> {selectedBook.title}</p>
//                 <p><b>Author:</b> {selectedBook.author}</p>
//                 <p><b>ISBN:</b> {selectedBook.isbn}</p>
//                 <button onClick={closeModal}>Close</button>
//               </>
//             )}

//             {modalType === "edit" && (
//               <>
//                 <h3>Edit Book</h3>
//                 <input
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                 />
//                 <input
//                   value={formData.author}
//                   onChange={(e) =>
//                     setFormData({ ...formData, author: e.target.value })
//                   }
//                 />
//                 <input
//                   value={formData.isbn}
//                   onChange={(e) =>
//                     setFormData({ ...formData, isbn: e.target.value })
//                   }
//                 />
//                 <button onClick={updateBook}>Update</button>
//                 <button onClick={closeModal}>Cancel</button>
//               </>
//             )}

//             {modalType === "delete" && selectedBook && (
//               <>
//                 <h3>Delete Book</h3>
//                 <p>Are you sure you want to delete <b>{selectedBook.title}</b>?</p>
//                 <button onClick={deleteBook}>Yes, Delete</button>
//                 <button onClick={closeModal}>Cancel</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );

// ///////////////////////////////////////////////////////////////////////////////////

return (
     <div className="books-layout">
  <div className="books-page">
    {/* HEADER */}
    <div className="books-header">
      <h2>Books</h2>
      <button onClick={openAddModal}>Add Book</button>
    </div>
  

      {/* TABLE */}
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <span
                    className="action-icon"
                    title="View"
                    onClick={() => openViewModal(book.id)}
                  >
                    👁️
                  </span>
                  <span
                    className="action-icon"
                    title="Edit"
                    onClick={() => openEditModal(book)}
                  >
                    ✏️
                  </span>
                  <span
                    className="action-icon delete"
                    title="Delete"
                    onClick={() => openDeleteModal(book)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* MODAL */}
    {showModal && (
      <div>
        <div>
          {/* ADD */}
          {modalType === "add" && (
            <>
              <h3>Add Book</h3>

              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />

              <input
                placeholder="ISBN"
                value={formData.isbn}
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
              />

              <button onClick={addBook}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </>
          )}

          {/* VIEW */}
          {modalType === "view" && selectedBook && (
            <>
              <h3>Book Details</h3>

              <p><strong>Title:</strong> {selectedBook.title}</p>
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>ISBN:</strong> {selectedBook.isbn}</p>

              <button onClick={closeModal}>Close</button>
            </>
          )}

          {/* EDIT */}
          {modalType === "edit" && (
            <>
              <h3>Edit Book</h3>

              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />

              <input
                value={formData.isbn}
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
              />

              <button onClick={updateBook}>Update</button>
              <button onClick={closeModal}>Cancel</button>
            </>
          )}

          {/* DELETE */}
          {modalType === "delete" && selectedBook && (
            <>
              <h3>Delete Book</h3>

              <p>
                Are you sure you want to delete
                <strong> {selectedBook.title}</strong>?
              </p>

              <button className="danger" onClick={deleteBook}>
                Yes, Delete
              </button>
              <button onClick={closeModal}>Cancel</button>
            </>
          )}
        </div>
      </div>
    )}
 </div>
    </div>
);

}
