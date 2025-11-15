import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "../chat/chat-list/ChatList";
import ChatItemHeader from "../chat/chat-buttons/ChatItemHeader";

const Dashboard: React.FC = () => {
  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#5E40F2", color: "white" }}
    >
      <ChatItemHeader />
      <ChatList />
    </div>
  );
};

export default Dashboard;
