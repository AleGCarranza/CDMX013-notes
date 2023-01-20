import { getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/google";
import "./EditNote.css";

const db = getFirestore(app);

export default function EditNote({ logOut }) {
  //userWriteNote
  const navigate = useNavigate();

  const [note, setNote] = useState({
    //declaración del estado
    title: "",
    note: "",
  });
  let { id } = useParams();
  const ReturnIcon = async () => {
    await navigate();
    navigate("/Home");
  };
  const HandleSignOut = async () => {
    await signOutUser();
    logOut();
    navigate("/");
  };
  const catchInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  useEffect(() => {
    const getDocToEdit = () => {
      //petición al servidor

      const docRef = doc(db, "Notes", id);
      return getDoc(docRef);
    };
    getDocToEdit().then((result) => {
      setNote(result.data());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); //aquí se va a renderizar, siempre y cuando Id tenga contenio, cambios.
  //console.log(note)
  const saveUpgradeNote = async (e) => {
    e.preventDefault();

    if (note.title !== "" && note.note !== "") {
      try {
        await setDoc(doc(db, "Notes", id), {
          ...note,
        });
        setNote({
          title: "",
          note: "",
        });
      } catch (error) {
        console.log(error);
      }
      navigate("/home");
    } else {
      alert("You can't send an empty note");
    }
  };
  return (
    <div className="margin">
      <div className="background">
        <h1 className="titleHome">My Notes user@mail.com</h1>
        <button className="logout">Logout</button>
        <form className="note" onSubmit={saveUpgradeNote}>
          <input
            type="text"
            name="title"
            className="noteTitle"
            placeholder="Title"
            onChange={catchInput}
            value={note.title}
          />
          <textarea
            name="note"
            className="noteText"
            placeholder="Note"
            onChange={catchInput}
            value={note.note}
          />
          <button className="buttonSave">Edit Note</button>
        </form>

        {/* <HandleSignOut />
        <ReturnIcon /> */}
      </div>
    </div>
  );
}
