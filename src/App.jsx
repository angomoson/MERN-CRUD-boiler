import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userData, setUserData] = useState();
  const [updateUserData, setUserUpdateData] = useState({
    Name: "asdd",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const { name, email } = formData;
  const { Name } = updateUserData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/create", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = async () => {
    await axios.get("http://localhost:5000/user").then((response) => {
      setUserData(response.data);
      console.log(response.data);
    });
  };

  const deleteUser = async (e) => {
    const id = e.target.id;
    await axios
      .delete(`http://localhost:5000/user/delete/${id}`)
      .then(() => console.log("user deleted"));

    getUser();
  };

  const updateUser = async (e) => {
    const id = e.target.id;
    await axios
      .patch(`http://localhost:5000/user/update/${id}`, updateUserData)
      .then(() => console.log(updateUserData));

    getUser();
  };

  const handleChangeUpdate = (e) => {
    setUserUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="App">
      <form className="form" action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <button onClick={getUser}>Get User</button>
      {userData?.map((user) => (
        <div key={user._id} className="users">
          <p>{user.name}</p>
          <button id={user._id} onClick={deleteUser} className="delete">
            delete
          </button>
          <form action="">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="update"
              name="Name"
              onChange={handleChangeUpdate}
            />
          </form>
          <button id={user._id} type="submit" onClick={updateUser}>
            update
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
