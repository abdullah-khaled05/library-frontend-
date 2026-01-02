import React from "react";  
import "../styles/books.css";   
import { useEffect, useState } from "react";
// import book.css for styling
import "../styles/books.css";
import {
  fetchMembersAPI,
  fetchSingleMemberAPI,
  addMemberAPI,
  updateMemberAPI,
  deleteMemberAPI,
} from "../api/axios";

function Members() {
    
    const API_URL = "http://localhost:3000/members";
    
      const [books, setBooks] = useState([]);
      const [loading, setLoading] = useState(false);
    
      const [showModal, setShowModal] = useState(false);
      const [modalType, setModalType] = useState(""); // add | view | edit | delete
    
      const [selectedBook, setSelectedBook] = useState(null);
    
      const [formData, setFormData] = useState({
        name: "",
        student_id: "",
        batch: "",
      });
    
      /* =========================
         API CALLS
      ========================= */
    
      // const fetchBooks = async () => {
      //   setLoading(true);
      //   const res = await fetch(API_URL);
      //   const data = await res.json();
      //   setBooks(data);
      //   setLoading(false);
      // };
    
      // const fetchSingleBook = async (id) => {
      //   const res = await fetch(`${API_URL}/${id}`);
      //   return res.json();
      // };
    
      // const addBook = async () => {
      //   await fetch(API_URL, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });
      //   closeModal();
      //   fetchBooks();
      // };
    
      // const updateBook = async () => {
      //   await fetch(`${API_URL}/${selectedBook.id}`, {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   });
      //   closeModal();
      //   fetchBooks();
      // };
    
      // const deleteBook = async () => {
      //   await fetch(`${API_URL}/${selectedBook.id}`, {
      //     method: "DELETE",
      //   });
      //   closeModal();
      //   fetchBooks();
      // };
    const fetchBooks = async () => {
  setLoading(true);
  const { data } = await fetchMembersAPI();
  setBooks(data);
  setLoading(false);
};

const fetchSingleBook = async (id) => {
  const { data } = await fetchSingleMemberAPI(id);
  return data;
};

const addBook = async () => {
  await addMemberAPI(formData);
  closeModal();
  fetchBooks();
};

const updateBook = async () => {
  await updateMemberAPI(selectedBook.id, formData);
  closeModal();
  fetchBooks();
};

const deleteBook = async () => {
  await deleteMemberAPI(selectedBook.id);
  closeModal();
  fetchBooks();
};

      /* =========================
         MODAL HANDLERS
      ========================= */
    
      const openAddModal = () => {
        setFormData({ name: "", student_id: "", batch: "" });
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
          name: book.name,
          student_id: book.student_id,
          batch: book.batch,
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
     
      
      const openBooks = () => {
        window.location.href = "/books";
      };

      useEffect(() => {
        fetchBooks();
      }, []);
    
    return (
  <div className="books-layout">
    <div className="books-page">

      {/* HEADER */}
      <div className="books-header">
        <h2>Members</h2>
        <button onClick={openBooks}>Go To Books</button>
        <button onClick={openAddModal}>Add Member</button>
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
                <th>name</th>
                <th>student_id</th>
                <th>batch</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.student_id}</td>
                  <td>{member.batch}</td>
                  <td>
                    <span
                      className="action-icon"
                      title="View"
                      onClick={() => openViewModal(member.id)}
                    >
                      👁️
                    </span>
                    <span
                      className="action-icon"
                      title="Edit"
                      onClick={() => openEditModal(member)}
                    >
                      ✏️
                    </span>
                    <span
                      className="action-icon delete"
                      title="Delete"
                      onClick={() => openDeleteModal(member)}
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
        <div className="modal-overlay">
          <div className="modal">

            {modalType === "add" && (
              <>
                <h3>Add Member</h3>
                <input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  placeholder="Student ID"
                  value={formData.student_id}
                  onChange={(e) =>
                    setFormData({ ...formData, student_id: e.target.value })
                  }
                />
                <input
                  placeholder="Batch"
                  value={formData.batch}
                  onChange={(e) =>
                    setFormData({ ...formData, batch: e.target.value })
                  }
                />
               
                <button onClick={addBook}>Save</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}

            {modalType === "view" && selectedBook && (
              <>
                <h3>Member Details</h3>
                <p><strong>Name:</strong> {selectedBook.name}</p>
                <p><strong>Student ID:</strong> {selectedBook.student_id}</p>
                <p><strong>Batch:</strong> {selectedBook.batch}</p>
                <button onClick={closeModal}>Close</button>
              </>
            )}

            {modalType === "edit" && (
              <>
                <h3>Edit Member</h3>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  value={formData.student_id}
                  onChange={(e) =>
                    setFormData({ ...formData, student_id: e.target.value })
                  }
                />
                <input
                  value={formData.batch}
                  onChange={(e) =>
                    setFormData({ ...formData, batch: e.target.value })
                  }
                />
                <button onClick={updateBook}>Update</button>
                <button onClick={closeModal}>Cancel</button>
              </>
            )}

            {modalType === "delete" && selectedBook && (
              <>
                <h3>Delete Member</h3>
                <p>
                  Are you sure you want to delete
                  <strong> {selectedBook.name}</strong>?
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

export default Members;