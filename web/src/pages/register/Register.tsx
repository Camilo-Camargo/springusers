import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState();
  const navigate = useNavigate();

  const handleRegister = () => { 
    const formData = new FormData();
    formData.append("profileImage", profileImage!);
    formData.append("username", username);
    formData.append("password", password);

    //document.cookie = `username=${username} password=${password}`;
    fetch("/create", {
      method: "post",
      body: formData
    }).then((res) => {
      res.json();
    }).then((data) => {
      console.log(data);
    })
    navigate("/");
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col m-auto gap-3">
        <div>
          {profileImage &&
            <img
              className="w-16 h-16 m-auto rounded-full object-cover"
              src={URL.createObjectURL(profileImage)}
            />
          }
          {!profileImage &&
            <div
              className="flex justify-center items-center bg-slate-900 text-slate-50 text-center w-16 h-16 rounded-full m-auto hover:w-20 hover:h-20"
              onClick={() => {
                const profileImageFile: HTMLInputElement = document.createElement("input");
                profileImageFile.type = "file";
                profileImageFile.onchange = (e) => {
                  const target = e.target as any;
                  setProfileImage(target.files[0]);
                };
                profileImageFile.click();
              }}
            >
              <span className="font-bold">Image</span>
            </div>
          }
        </div>

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
          onClick={handleRegister}
        >Register</button>
        <button
          className="border p-2"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  )

}
