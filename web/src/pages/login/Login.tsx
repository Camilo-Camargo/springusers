import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col m-auto gap-3">
        <input
          className="focus:outline-none border p-1 rounded focus:ring-1"
          placeholder='username'
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          className="focus:outline-none border p-1 rounded focus:ring-1"
          placeholder='password'
          type="password"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          className="border rounded p-2 bg-slate-900 text-slate-50 font-bold hover:bg-slate-700"
          onClick={async () => {
            const res = await apiPost("/api/login", {
              username: username,
              password: password
            });
            const resJson = await res.json();

            if (resJson.id) {
              navigate("/home", { state: resJson });
            }
          }}
        >Login</button>

        <button
          className="border rounded p-2"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div >
  )

}
