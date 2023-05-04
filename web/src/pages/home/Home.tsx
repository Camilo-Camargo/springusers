import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";

type User = {
  username: string;
  role?: string;
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
  const [chatMessages, setChatMessages] = useState<Array<UserMessage>>([]);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const endpoint = "ws://192.168.230.2:8080"
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
      chatMessagesNew.push(JSON.parse(event.data));
      setChatMessages(chatMessagesNew);
    }
  }


  return (
    <div className="flex flex-col h-screen w-screen p-2 gap-6 justify-between">

      <div className="flex justify-between items-center">

        <div className="flex gap-6 items-center">

          {
            user.profileImage &&
            <img
              className="rounded-full w-16 h-16 object-cover"
              src={user.profileImage}
            />
          }

          <div className="flex flex-col">
            <span>{user.username}</span>
            <button className="text-left w-fit text-red-500 ">Logout</button>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-light">Welcome back to</span>
          <h1 className="text-2xl font-bold">SpringUsers</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full p-6 h-full overflow-scroll shadow rounded">
        {
          chatMessages &&
          chatMessages.map((msg) => {
            return (
              <div className="w-auto bg-slate h-fill gap-6 flex justify-between items-center">
                <p className="break-all">{msg.message}</p>
                <div className="flex gap-2 justify-between items-center">
                  <img className="w-12 h-12 rounded-full" src={msg.profileImage} />
                  <span className="text-slate-400">{msg.username}</span>
                </div>
              </div>
            );
          })
        }

        {
          chatMessages.length == 0 && <>
            <p>No messages</p>
          </>
        }
      </div>


      <div className="flex flex-col w-full p-6 justify-between gap-6 shadow-md rounded">



        <div className="flex justify-between gap-3">
          {
            user?.role == "admin" &&
            <>
              <input
                className="w-full bg-slate-200 text-slate-900 placeholder:text-slate-400 p-1 rounded shadow-sm"
                placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
              <button
                className="bg-slate-900 text-slate-50 font-bold p-2 rounded "
                onClick={() => {
                  socket!.send(JSON.stringify({
                    username: user.username,
                    profileImage: user.profileImage,
                    message: message
                  }));
                  setMessage("");

                }}
              >Send</button>
            </>
          }
        </div>
      </div>


    </div>
  );
}
