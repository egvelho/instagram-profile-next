import { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import type { GetServerSideProps } from "next";
import { LoadingIndicator } from "src/components/LoadingIndicator";
import { getServerSession } from "src/auth/getServerSession";
import { UserItem } from "src/user/components/UserItem";
import * as userRepository from "src/user/userRepository";
import * as messageRepository from "src/message/messageRepository";

type MessengerPageProps = {
  contacts: userRepository.User[];
  user: userRepository.User;
};

export default function MessengerPage({ contacts, user }: MessengerPageProps) {
  const [currentUser, setCurrentUser] = useState(
    undefined as userRepository.User | undefined
  );

  const [message, setMessage] = useState("");

  const [, sendMessage] = useAxios<
    messageRepository.Message,
    { message: string }
  >(
    {
      url: `/api/user/messages/${currentUser?.id}/create`,
      method: "post",
      data: { message },
    },
    {
      manual: true,
    }
  );

  const [{ data: messages = [], loading }, getMessages, cancelGetMessages] =
    useAxios<messageRepository.Message[]>(
      {
        url: `/api/user/messages/${currentUser?.id}/list`,
        method: "get",
      },
      {
        useCache: true,
        manual: currentUser === undefined,
      }
    );

  useEffect(() => {
    if (currentUser === undefined) {
      cancelGetMessages();
      return;
    }

    const timeoutId = setTimeout(() => {
      cancelGetMessages();
      getMessages();
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  return (
    <div className="messenger-page">
      <div className="contacts-list">
        {contacts.map((user) => (
          <div
            key={user.id}
            className={`user-item ${
              currentUser?.id === user.id && "user-selected"
            }`}
            onClick={() => setCurrentUser(user)}
          >
            <UserItem key={user.id} user={user} />
          </div>
        ))}
      </div>
      <div className="chat">
        <div className="chat-messages">
          {loading && (
            <div className="chat-messages-loader">
              <LoadingIndicator size="96px" color="#f9f9f9" />
            </div>
          )}
          {currentUser &&
            !loading &&
            messages.map(({ id, message, senderId }) => (
              <div
                key={id}
                className={`chat-message ${
                  senderId === user.id ? "my-message" : "its-message"
                }`}
              >
                {message}
              </div>
            ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Digite sua mensagem"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyUp={async (event) => {
              if (event.key === "Enter" && currentUser !== undefined) {
                await sendMessage();
                setMessage("");
              }
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .messenger-page {
          margin-top: 32px;
          border-radius: 4px;
          border: solid #ccc 1px;
          background-color: white;
          display: flex;
          height: calc(80vh - 64px - 32px);
        }

        .contacts-list {
          width: 256px;
          border-right: 1px solid #ccc;
          overflow-y: auto;
        }

        .user-item:not(.user-selected):hover {
          background-color: #eee;
          cursor: pointer;
        }

        .user-selected {
          background-color: #82589f;
          color: #f9f9f9;
        }

        .chat {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .chat-input-container {
          background-color: #eee;
          padding: 8px;
        }

        .chat-input {
          width: 100%;
          background-color: white;
          border-radius: 18px;
          border: #ccc solid 1px;
          box-sizing: border-box;
          height: 42px;
          padding: 0 18px;
        }

        .chat-messages-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .chat-messages {
          flex: 1;
          background-color: #d6a2e8;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .chat-message {
          color: #101010;
          background-color: #f9f9f9;
          padding: 8px;
          box-sizing: border-box;
          border-radius: 8px;
          box-shadow: 1px 2px 3px;
          font-size: 12px;
        }

        .chat-message:not(:last-child) {
          margin-bottom: 8px;
        }

        .my-message {
          align-self: flex-end;
          background-color: #dff9fb;
        }

        .its-message {
          align-self: flex-start;
          background-color: #f7f1e3;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  MessengerPageProps
> = async ({ req, res }) => {
  const session = await getServerSession(req, res);
  const user = (await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
    },
  })) as userRepository.User;

  const contacts = await userRepository.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
    },
  });
  return { props: { contacts, user } };
};
