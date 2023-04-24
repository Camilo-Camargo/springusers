import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [enableCookies, setEnableCookies] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen bg-slate-50">
      <div className="flex flex-col gap-6 w-64 m-auto py-6 px-6 shadow-md rounded">

        <h1 className="text-4xl font-bold">SpringUsers</h1>

        <div className="flex items-center gap-2">
          <div className="flex-grow border-t"></div>
          <span>Operations</span>
          <div className="flex-grow border-t"></div>
        </div>

        <div className="flex justify-between">
          <button
            className="flex-grow w-auto h-auto bg-slate-600 text-slate-50 p-2 font-bold"
            onClick={() => { navigate("/login"); }}>
            Login
          </button>

          <button
            className="flex-grow w-auto h-auto bg-slate-800 text-slate-50 p-2 font-bold"
            onClick={() => { navigate("/register"); }}>
            Register
          </button>
        </div>


        <div className="flex items-center gap-2">
          <div className="flex-grow border-t"></div>
          <span>Extra</span>
          <div className="flex-grow border-t"></div>
        </div>



        <button
          className="w-auto h-auto bg-slate-200 text-slate-800 p-2 font-bold rounded"
          onClick={() => {
            setEnableCookies(!enableCookies);
          }}
        >{enableCookies ? "Show" : "Hide"} cookies</button>

      </div>

      {
        enableCookies &&
        <div>
          {document.cookie}
        </div>
      }
    </div>
  );
}
