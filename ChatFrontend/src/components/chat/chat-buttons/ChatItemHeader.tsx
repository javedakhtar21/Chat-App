import React, { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { FilterChatModal } from "../Modals/FilterChatModal";

const ChatItemHeader: React.FC = () => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const handleOpenfilterDialog = () => {
    setOpenFilterDialog(!openFilterDialog);
  };

  const handleClosefilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const onAddChat = () => {};

  return (
    <div>
      <FilterChatModal
        open={openFilterDialog}
        // open={true}
        onOpenChange={handleClosefilterDialog}
      />

      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h2 className="m-0 fw-semibold">Chats</h2>

        <div className="d-flex gap-2">
          <button
            onClick={onAddChat}
            className="btn btn-success d-flex align-items-center gap-1"
          >
            <FaPlus />
            <span>New Chat</span>
          </button>

          <button
            onClick={handleOpenfilterDialog}
            className="btn btn-outline-light d-flex align-items-center gap-1"
          >
            <FaFilter />
            {/* <span>Filter</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItemHeader;
