import { useState } from "react";
//import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { db, app } from "./firebase/config";
import Login from "./views/Login";
import Home from "./views/Home";
import Addnote from "./views/Addnote";
import EditNote from "./views/EditNote";

function App() {
  const initialValue = {
    title: "",
    content: "",
  };
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [userWriteNote, setUserWriteNote] = useState(initialValue);
  // useEffect(() => {
  //   const getData = async () => {
  //     const saveData = await getDocs(collection(db, "users"));
  //   };
  //   getData();
  // }, []);

  function setUserNull() {
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route
        path="/home"
        element={
          user ? <Home logOut={setUserNull} /> : <Login setUser={setUser} />
        }
      />
      <Route path="/add" element={<Addnote />} />
      <Route path="/editnote/:id" element={<EditNote />} />
    </Routes>
  );
}

export default App;
