import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";
import { FiFile, FiImage, FiVideo } from "react-icons/fi";
import { MdAudiotrack, MdOutlineAttachFile } from "react-icons/md";
import { handleUpload } from "../../utils/Handlers";

type User = {
  username: string;
  role?: string;
  profileImage: string;
};

type UserMessage = {
  message: string;
  type: string
} & User;

export default function Home() {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = useLocation().state as User;
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<UserMessage>>([]);
  const [socket, setSocket] = useState<WebSocket>();
  const [userFiles, setUserFiles] = useState<Array<File>>([]);

  useEffect(() => {
    const endpoint = "ws://192.168.122.11:8080"
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

  async function handleUserFiles() {
    const file = await handleUpload() as File;
    const userFilesClone = [...userFiles];
    userFilesClone.push(file);
    setUserFiles(userFilesClone);
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
                {
                  msg.type === "message" &&
                  <p className="break-all">{msg.message}</p>
                }

                {
                  msg.type === "image/png" &&
                  <img src={msg.message} />
                }

                {
                  msg.type === "video/mp4" &&
                  <video
                    className="w-96 h-auto"
                    src={msg.message}
                    controls
                  />
                }



                {
                  msg.type === "audio/mpeg" && <MdAudiotrack
                    size={24}
                    onClick={() => {
                      const downloader: HTMLAnchorElement = document.createElement("a");
                      downloader.href = msg.message;
                      downloader.click();
                    }}
                  />
                }

                {
                  msg.type === "text/plain" && <FiFile
                    size={24}
                    onClick={() => {
                      const downloader: HTMLAnchorElement = document.createElement("a");
                      downloader.href = msg.message;
                      downloader.click();
                    }}
                  />
                }

                <div className="flex gap-2 justify-between items-center">
                  <img className="w-12 h-12 rounded-full object-cover" src={msg.profileImage} />
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





      {
        user?.role == "admin" &&
        <div className="flex flex-col w-full p-6 justify-between gap-6 shadow-md rounded">

          {
            userFiles.map((file) => {
              return (
                <div className="flex items-center gap-2">
                  {/* TODO: add regex for all types because may be more than one image format. */}
                  {file.type === "image/png" && <FiImage size={24} />}
                  {file.type === "video/mp4" && <FiVideo size={24} />}
                  {file.type === "audio/mpeg" && <MdAudiotrack size={24} />}
                  {file.type === "text/plain" && <FiFile size={24} />}
                  <span>{file.name}</span>
                </div>
              )
            })
          }

          <div className="flex justify-between items-center gap-3">
            <input
              className="w-full bg-slate-200 text-slate-900 placeholder:text-slate-400 p-1 rounded shadow-sm"
              placeholder="Message" onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            {/* TODO: create a component with icon parameter and onclick function */}
            <MdOutlineAttachFile size={28} onClick={handleUserFiles} />

            <button
              className="bg-slate-900 text-slate-50 font-bold p-2 rounded "
              onClick={() => {
                socket!.send(JSON.stringify({
                  username: user.username,
                  profileImage: user.profileImage,
                  message: message,
                  type: "message"
                }));

                userFiles.map((file) => {

                  const formData = new FormData();
                  formData.append("file", file!);

                  fetch(`upload-dir/shared/${user.username}/${file.name}`, {
                    method: "post",
                    body: formData
                  }).then(() => {
                    console.log("loaded")
                  }).then(() => {
                    socket!.send(JSON.stringify({
                      username: user.username,
                      profileImage: user.profileImage,
                      message: `upload-dir/shared/${user.username}/${file.name}`,
                      type: file.type
                    }))
                  })

                });

                setMessage("");
                setUserFiles([]);
              }}
            >Send</button>
          </div>
        </div>
      }

    </div>
  );
}
