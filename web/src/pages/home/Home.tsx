import { useContext, useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../storage/GlobalContext";
import { FiFile, FiImage, FiVideo } from "react-icons/fi";
import { MdAudiotrack, MdOutlineAttachFile } from "react-icons/md";
import { handleUpload } from "../../utils/Handlers";
import { apiGet, apiPost, apiResourceUrl, apiWebSocketUrl } from "../../services/api";

type User = {
  id: number;
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
  const [curTab, setCurTab] = useState<string>("Chats");
  const [curChat, setCurChat] = useState<number>(0);
  const [tabs, setTabs] = useState<any>({});

  useEffect(() => {
    const socket = new WebSocket(apiWebSocketUrl("/chat"));

    if (globalContext.auth) {
      navigate("/login");
    }

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    apiGet(`/api/users/${user.id}/rooms`)
      .then(r => r.json())
      .then(rooms => {
        const chats = [];
        const groups = [];

        rooms.forEach(r => {
          if (r.users.length > 2) {
            // @ts-ignore
            groups.push({ ...r, image: user.profileImage });
          } else {
            if (chats.length === 1) {
              setCurChat(r.id)
            } else {
              const users: [] = r.users;
              if (users.length > 1) {
                // @ts-ignore
                const target = users.find((u) => u.id !== user.id);
                // @ts-ignore
                chats.push({ ...r, image: target.profileImage, title: target.username });
              } else {
                // @ts-ignore
                chats.push({ ...r, image: user.profileImage, title: user.username });
              }
            }
          }
        });



        setTabs({
          Chats: chats,
          Groups: groups
        });
      });
  }, [curTab]);

  useEffect(() => {
    apiGet(`/api/rooms/${curChat}/messages`)
      .then(r => r.json())
      .then(messages => {
        setChatMessages(messages)
      });
  }, [curChat]);

  if (socket) {
    socket!.onmessage = (event: any) => {
      apiGet(`/api/rooms/${curChat}/messages`)
        .then(r => r.json())
        .then(messages => {
          setChatMessages(messages);
        });
    }
  }

  async function handleUserFiles() {
    const file = await handleUpload() as File;
    const userFilesClone = [...userFiles];
    userFilesClone.push(file);
    setUserFiles(userFilesClone);
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen w-screen justify-between">
      <div className="flex justify-between flex-col gap-10 items-center py-2 w-72">
        <div className="flex flex-col">
          <span className="font-light">Welcome back to</span>
          <h1 className="text-2xl font-bold">SpringUsers</h1>
        </div>

        <div className="flex gap-3 flex-col w-full h-full items-center">
          <div className="flex w-full">
            {Object.keys(tabs).map((tab) => {
              return (
                <button
                  className={`text-center w-full p-2 ${tab === curTab ? "bg-black text-white" : " text-black "}`}
                  onClick={() => {
                    setCurTab(tab);
                  }}
                >{tab}</button>
              );
            })}
          </div>

          <div className="flex flex-col w-full">
            {

              curTab in tabs &&
              tabs[curTab].map((chat) => {

                return (
                  <button
                    className={`text-left p-2 w-full ${chat.id === curChat ? "bg-gray-100" : " text-black "}`}
                    onClick={() => {
                      setCurChat(chat.id);
                    }}
                  >

                    <div className="flex items-center gap-2">
                      <img className="w-12 h-12 rounded-full border object-cover border-gray-500" src={apiResourceUrl(chat.image)} />
                      {chat.title}
                    </div>
                  </button>
                );
              })
            }
          </div>


        </div>

        <div className="flex gap-6 w-full pl-4">
          <div>
            {
              user.profileImage &&
              <img
                className="rounded-full w-16 h-16 object-cover border border-gray-500"
                src={apiResourceUrl(user.profileImage)}
              />
            }
          </div>

          <div className="flex flex-col">
            <span>{user.username}</span>
            <button onClick={() => {
              navigate('/');
            }} className="text-left w-fit text-red-500 ">Logout</button>
          </div>

        </div>
      </div>

      <div className="flex flex-col w-full border-l border-gray-200 items-center">
        <div className="flex flex-col gap-6 w-full p-6 h-full overflow-scroll ">
          {
            chatMessages &&
            // @ts-ignore
            chatMessages.map((msg, index) => {
              let urlResource = "";

              switch (msg.type) {
                case "image/png":
                case "video/mp4":
                case "audio/mpeg":
                case "text/plain":
                  urlResource = apiResourceUrl(msg.message);
              }



              return (
                <div key={index} className="w-full bg-slate h-fill gap-2 flex justify-between items-center">

                  {
                    // @ts-ignore
                    msg.user.id !== user.id && <div className="w-14 h-14">
                      <img className=" rounded-full object-cover" src={
                        // @ts-ignore
                        apiResourceUrl(msg.user.profileImage)
                      } />
                    </div>}

                  {
                    msg.type === "message" &&
                    <div className={`flex w-full  ${
                      // @ts-ignore
                      msg.user.id === user.id ? "justify-end" : "justify-start"
                      }`}>
                      <p className="break-all text-right  p-2 bg-gray-50 rounded">{msg.message}</p>
                    </div>
                  }

                  {
                    msg.type === "image/png" &&
                    <img src={urlResource} />
                  }

                  {
                    msg.type === "video/mp4" &&
                    <video
                      className="w-96 h-auto"
                      src={urlResource}
                      controls
                    />
                  }

                  {
                    msg.type === "audio/mpeg" && <MdAudiotrack
                      size={24}
                      onClick={() => {
                        const downloader: HTMLAnchorElement = document.createElement("a");
                        downloader.href = urlResource;
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

                  {
                    // @ts-ignore
                    msg.user.id === user.id && <div className="w-14 h-14">
                      <img className=" rounded-full object-cover" src={
                        // @ts-ignore
                        apiResourceUrl(msg.user.profileImage)
                      } />
                    </div>}


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
          <div className="flex flex-col w-full justify-between gap-6">

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
            <div className="w-full border border-gray-200"></div>

            <div className="flex w-full justify-between items-center gap-3 pb-4 px-4">
              <input
                className="w-full bg-slate-200 text-slate-900 placeholder:text-slate-400 p-2 rounded"
                placeholder="Message" onChange={(e) => setMessage(e.target.value)}
                value={message}
              />

              {/* TODO: create a component with icon parameter and onclick function */}
              <MdOutlineAttachFile size={28} onClick={handleUserFiles} />

              <button
                className="bg-slate-900 text-slate-50 font-bold p-2 rounded "
                onClick={async () => {

                  await apiPost("/api/messages", {
                    "message": message,
                    "type": "message",
                    "userId": user.id,
                    "roomId": curChat
                  });

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
    </div>
  );
}
