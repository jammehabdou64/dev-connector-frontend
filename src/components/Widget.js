import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";

const Widget = () => {
  const {
    message: { messages },
    auth: { auth },
  } = useSelector((state) => state);

  // useEffect(()=>)

  const chat = (message, auth) => {
    const user = new Auth(auth);
    if (message?.sender?._id === user?._id) {
      return message?.recipient;
    }
    return message?.sender;
  };

  return (
    <div className="py-5 w-[350px] hidden mt-5 sticky top-5 lg:block min-h-[100px] h-fit px-5 bg-black shadow-xl">
      <h3 className="text-yellow-500 text-center text-xl font-semibold">
        Chats
      </h3>
      <div>
        <ul className="mt-3 py-3">
          {messages.map((message) => (
            <div key={message._id}>
              <li>
                <Link
                  to={`/message/${chat(message, auth)?.name?.replace(
                    /\s/g,
                    "-"
                  )}/${chat(message, auth)?._id}`}
                >
                  {/* {console.log(chat(message, auth))} */}
                  <div className="flex items-center gap-2">
                    <img
                      src={chat(message, auth)?.avatar}
                      alt="user-img"
                      className="h-10 w-10 object-cover rounded-full"
                    />
                    <p className="text-lg">{chat(message, auth)?.name}</p>
                  </div>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Widget;
