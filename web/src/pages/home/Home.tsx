import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";



type User = {
  username: string;
  profileImage: string;
};

type UserMessage = {
  message: string;
} & User;

export default function Home() {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = useLocation().state as User;
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<UserMessage>>([
    /*{
      username: "Camilo",
      profileImage: "https://avatars.githubusercontent.com/u/24948289?v=4",
      message: "hello world"
    }*/
  ]);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const endpoint = "ws://192.168.116.11:8080"
    const socket = new WebSocket(`${endpoint}/chat`);


    if (globalContext.auth) {
      navigate("/login");
    }

    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  if (socket) {
    socket!.onmessage = (event: any) => {
      const chatMessagesNew = [...chatMessages];
      chatMessagesNew.unshift(JSON.parse(event.data));
      setChatMessages(chatMessagesNew);
    }
  }


  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-50">
      <div className="flex flex-col justify-between w-auto h-auto p-6 gap-6 shadow-md rounded">

        {
          user &&
          <div className="flex gap-6 items-center">

            {
              user.profileImage &&
              <img
                className="rounded-full w-16 h-16 object-cover"
                src={user.profileImage}
              />
            }

            <span>{user.username}</span>
          </div>
        }

        <div className="flex flex-col">
          <span className="text-xl font-light">Welcome back to</span>
          <h1 className="text-4xl font-bold">SpringUsers</h1>
        </div>

        <div className="flex gap-3">
          <input
            className="bg-slate-200 text-slate-900 placeholder:text-slate-400 p-1 rounded shadow-sm"
            placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
          <button
            className="bg-slate-900 text-slate-50 font-bold p-2 rounded "
            onClick={() => {
              socket!.send(JSON.stringify({
                username: user.username,
                profileImage: user.profileImage,
                message: message
              }));
            }}
          >Send</button>
        </div>

        {
          chatMessages &&
          chatMessages.map((msg) => {
            return (
              <div className="w-64 gap-6 flex justify-between items-center">
                <p className="break-all">{msg.message}</p>
                <div className="flex gap-2 justify-between items-center">
                  <img className="w-12 h-12 rounded-full" src={msg.profileImage} />
                  <span className="text-slate-400">{msg.username}</span>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
