import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "../chat/chat-list/ChatList";
import ChatItemHeader from "../chat/chat-buttons/ChatItemHeader";
import SearchBar from "../ui/SearchInput/SearchBar";

const Dashboard: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div
      className="container-fluid border p-3 d-flex flex-column gap-2"
      // style={{ backgroundColor: "#5E40F2", color: "white" }}
      style={{ backgroundColor: "light-gray", color: "black" }}

    >
      <ChatItemHeader />
      <SearchBar
        value={searchText}
        onChange={(value) => setSearchText(value)}
      />
      <ChatList />
    </div>
  );
};

export default Dashboard;
