// import { signOutUser } from "../firebase/google";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HandleSignOut } from "../components/buttons/Exit";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import Addnote from "./Addnote.js";
import { db } from "../firebase/config";
import "./Home.css";
//import idea from "../components/images/ideahome.png";
import add from "../components/images/iconadd.png";
import iconclose from "../components/images/iconclose.png";
import iconedit from "../components/images/iconedit.png";

export default function Home() {
  const navigate = useNavigate();

  const buttonAdd = () => {
    navigate("/Add");
  };

  //variables de estado
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Notes"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []);

  //funcion eliminar nota de usuario
  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "Notes", id));
    const newNote = [...list.filter((item) => item.id !== id)];
    setList(newNote);
  };

  const [currentId, setCurrentId] = useState("");
  // const getOneNote = async (id) => {
  //   try {
  //     const docRef = doc(db, "Notes", id);
  //     const docNote = await getDoc(docRef);
  //     setCurrentId(docNote.data());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (subDoc !== "") {
  //     getOneNote(subDoc);
  //   }
  // }, [subDoc]);

  return (
    <div className="margin">
      <div className="background">
        <h1 className="titleHome">My Notes user@mail.com</h1>
        {/* <img src={idea} className="idea" alt="imagen idea home " /> */}
        <img
          src={add}
          onClick={() => buttonAdd()}
          className="iconadd"
          alt="icon add "
        />
        {/* <h3 className="insightHome">Las notas que agregues aparecerán aquì</h3> */}
        <div className="containerAll">
          {list.map((list) => (
            <div className="containerNote" key={list.id}>
              <p className="notesTitle">{list.title}</p>
              <p className="notesText">{list.note}</p>
              <button>
                <img
                  src={iconclose}
                  className="buttondelete"
                  onClick={() => deleteNote(list.id)}
                  alt="eliminar nota"
                />
              </button>
              <button className="edit">
                <img
                  src={iconedit}
                  className="button "
                  alt="edit note"
                  onClick={() => setCurrentId(list.id)}
                />
              </button>
              <HandleSignOut />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
