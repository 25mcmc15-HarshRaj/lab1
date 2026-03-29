import { useState, useEffect } from "react";
import API from "./api";
import UserForm from "./components/userForm";
import UserList from "./components/userList";

function App() {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => setRefresh(!refresh);

    return (
        <div>
            <h1>CRUD App</h1>

            <UserForm fetchUsers={triggerRefresh} />
            <UserList refresh={refresh} />
        </div>
    );
}

export default App;