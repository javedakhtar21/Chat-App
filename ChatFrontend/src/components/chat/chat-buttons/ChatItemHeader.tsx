import React, { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { FilterChatModal } from "../Modals/FilterChatModal";
import { NewChatModal } from "../Modals/AddChatModal";

const ChatItemHeader: React.FC = () => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false);

  const handleOpenfilterDialog = () => {
    setOpenFilterDialog(!openFilterDialog);
  };

  const handleClosefilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const handleOpenNewChat = () => {
    setOpenNewChatDialog(!openNewChatDialog);
  };

  const handleCloseNewChat = () => {
    setOpenNewChatDialog(false);
  };

  return (
    <div>
      <FilterChatModal
        open={openFilterDialog}
        onOpenChange={handleClosefilterDialog}
      />

      {/* NEW CHAT MODAL */}
      <NewChatModal
        open={openNewChatDialog}
        onOpenChange={handleCloseNewChat}
      />

      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h2 className="m-0 fw-semibold">Chats</h2>

        <div className="d-flex gap-2">
          <button
            onClick={handleOpenNewChat}
            className="btn btn-light d-flex align-items-center gap-1"
          >
            <FaPlus />
            {/* <span>New Chat</span> */}
          </button>

          <button
            onClick={handleOpenfilterDialog}
            className="btn btn-light d-flex align-items-center gap-1"
          >
            <FaFilter />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItemHeader;
