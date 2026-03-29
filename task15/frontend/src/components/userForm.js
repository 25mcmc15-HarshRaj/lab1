import { useState } from "react";
import API from "../api";

function UserForm({ fetchUsers }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, age } = form;

    if (!name || !email || !age) {
      setError("Please fill all fields (name, email, age)");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    await API.post("/", form);
    fetchUsers();

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <div className="form-container">

      <h2>Add User</h2>

      {error && <p className="error">{error}</p>}

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={form.name}
        className="input"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        className="input"
      />

      <input
        name="age"
        placeholder="Age"
        onChange={handleChange}
        value={form.age}
        className="input"
      />

      <button onClick={handleSubmit} className="btn-save">
        Save
      </button>
    </div>
  );
}

export default UserForm;