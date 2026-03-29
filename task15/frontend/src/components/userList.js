import { useEffect, useState } from "react";
import API from "../api";

function UserList({ refresh }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const startEdit = (user) => {
    setEditingUser(user.id);
    setEditForm(user);
  };

  const updateUser = async () => {
    await API.put(`/${editingUser}`, editForm);
    setEditingUser(null);
    getUsers();
  };

  const getUsers = async () => {
    const res = await API.get(`/?page=${page}&search=${search}`);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, [page, search, refresh]);

  const deleteUser = async (id) => {
    await API.delete(`/${id}`);
    getUsers();
  };

  return (
    <div className="list-container">

      <h2>User List</h2>

      <input
        className="search"
        placeholder="Search name/email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {users.map((u) => (
        <div key={u.id} className="card">

          {editingUser === u.id ? (
            <>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="input"
              />

              <input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="input"
              />

              <input
                value={editForm.age}
                onChange={(e) =>
                  setEditForm({ ...editForm, age: e.target.value })
                }
                className="input"
              />

              <button onClick={updateUser} className="btn-update">Update</button>
              <button onClick={() => setEditingUser(null)} className="btn-cancel">Cancel</button>
            </>
          ) : (
            <>
              <span className="user-text">
                {u.name} | {u.email} | {u.age}
              </span>

              <div>
                <button onClick={() => startEdit(u)} className="btn-edit">Edit</button>
                <button onClick={() => deleteUser(u.id)} className="btn-delete">Delete</button>
              </div>
            </>
          )}

        </div>
      ))}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

    </div>
  );
}

export default UserList;