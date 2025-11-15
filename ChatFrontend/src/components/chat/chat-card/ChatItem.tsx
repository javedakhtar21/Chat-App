import React from "react";

interface IMessage {
  username: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface IChatItemProps {
  message: IMessage;
}

const ChatItem: React.FC<IChatItemProps> = ({ message }) => {
  const { username, lastMessage, time, unread } = message;

  return (
    <div className="mt-2 list-group-item list-group-item-action d-flex justify-content-between align-items-center cursor-pointer">
      <div>
        <h6 className="mb-1">{username}</h6>
        <p className="mb-0 text-muted small">{lastMessage}</p>
      </div>
      <div className="text-end">
        <small className="d-block text-black">{time}</small>
        <span className="badge bg-success rounded-pill">{unread}</span>
      </div>
    </div>
  );
};

export default ChatItem;
