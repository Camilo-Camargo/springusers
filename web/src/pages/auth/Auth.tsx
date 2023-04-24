import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";

export function Auth() {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (globalContext.auth) {
      navigate("/home");
    }
    navigate("/login");
  }, []);

  return <></>;
}
