import logout from "../images/iconlogout.png";
import { signOutUser } from "../../firebase/google";
import { useNavigate } from "react-router-dom";

export function HandleSignOut(props) {
  const exit = props.logOut;
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOutUser(exit);
    // exit();
    navigate("/");
  };
  return (
    <>
      <button className="logout" onClick={() => handleSignOut()}>
        Logout
      </button>
      <img src={logout} className="iconlogout" alt="imagen logo app " />
    </>
  );
}
