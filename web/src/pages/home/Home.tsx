import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";

export default function Home() {
  const globalContext = useContext(GlobalContext);
  const [enableCookies, setEnableCookies] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (globalContext.auth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen w-screen bg-slate-50">
      <div className="flex flex-col w-64 m-auto py-6 px-6 shadow-md rounded">
        <span className="text-xl font-light">Welcome back to</span>
        <h1 className="text-4xl font-bold">SpringUsers</h1>
      </div>
    </div>
  );
}
