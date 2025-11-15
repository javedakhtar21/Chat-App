import ChatItem from "../chat-card/ChatItem";
import { HelperFunctionsClass } from "../../../Utils/HelperFunctions/HelperFunctions";

const ChatList = () => {
  const formattedDate=HelperFunctionsClass.getDateAndTime()  // Example dummy data
  const messages = [
    {
      id: 1,
      username: "Alice",
      lastMessage: "Hey, what's up?",
      time: formattedDate,
      unread: 2,
    },
    {
      id: 2,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },

    {
      id: 3,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },
    {
      id: 4,
      username: "Alice",
      lastMessage: "Hey, what's up?",
      time: formattedDate,
      unread: 2,
    },
    {
      id: 5,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },

    {
      id: 6,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },
    {
      id: 7,
      username: "Alice",
      lastMessage: "Hey, what's up?",
      time: formattedDate,
      unread: 2,
    },
    {
      id: 8,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },

    {
      id: 9,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 10,
    },
    {
      id: 10,
      username: "Alice",
      lastMessage: "Hey, what's up?",
      time: formattedDate,
      unread: 2,
    },
    {
      id: 11,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },

    {
      id: 12,
      username: "Bob",
      lastMessage: "I'll call you back.",
      time: formattedDate,
      unread: 0,
    },
  ];

  return (
    <div className="list-group">
      {messages.map((msg) => (
        <ChatItem key={msg.id} message={msg} />
      ))}
    </div>
  );
};

export default ChatList;
