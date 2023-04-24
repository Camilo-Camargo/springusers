import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState<boolean>(false);
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const navigate = useNavigate();

  if (usernameValid && passwordValid) {
    navigate("/home");
  } 

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
          onClick={() => {
            const cookies = document.cookie.split(" ");
            if (cookies.length != 0) {
              setLogin(false);
            }

            const data = cookies.map((item) => {
              return item.split("=")[1];
            });

            if (data[0] == username) {
              setUsernameValid(true);
            } else {
              setUsernameValid(false);
            }

            if (data[1] == password) {
              setPasswordValid(true);
            } else {
              setUsernameValid(false);
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
    </div>
  )

}
