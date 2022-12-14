import { useNavigate } from "react-router-dom";
import iconReturn from "../images/iconreturn.png";

export function ReturnIcon() {
  const navigate = useNavigate();
  const returnButton = () => {
    navigate("/Home");
  };
  return (
    <>
      <button className="buttonBack" onClick={() => returnButton()}>
        Back
      </button>
      <img src={iconReturn} className="iconreturn" alt="imagen logo app " />
    </>
  );
}
