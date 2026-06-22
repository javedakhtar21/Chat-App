import React from "react";
import { Form } from "react-bootstrap";
import ConversationList from "./ConversationList";
import { FaPlus } from "react-icons/fa";

const ConversationSidebar: React.FC<any> = ({
  searchText,
  setSearchText,
  conversations,
  loading,
  error,
  handleStartNewConversation,
  selectedConversation,
  handleConversationClick,
}: any) => {
  return (
    <>
      {/* Left Sidebar - User List */}
      <div
        className="border-end d-flex flex-column"
        style={{ width: "350px", minWidth: "300px" }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-3">Chats</h5>
            <button
              className="btn btn-primary btn-sm d-inline-flex align-items-center gap-2"
              onClick={handleStartNewConversation}
            >
              <FaPlus />
              New Chat
            </button>
          </div>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            size="sm"
          />
        </div>
        <ConversationList
          conversations={conversations}
          loading={loading}
          error={error}
          handleStartNewChat={handleStartNewConversation}
          selectedConversation={selectedConversation}
          handleConversationClick={handleConversationClick}
        />
      </div>
    </>
  );
};

export default ConversationSidebar;
