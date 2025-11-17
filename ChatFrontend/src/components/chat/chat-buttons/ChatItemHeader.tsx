import React, { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { FilterChatModal } from "../Modals/FilterChatModal";
import { NewChatModal } from "../Modals/AddChatModal";
import Button from "../../ui/Button/TButton";
import Tooltip from "../../ui/Tooltip/Tooltip";

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
    <div className="border">
      <FilterChatModal
        open={openFilterDialog}
        onOpenChange={handleClosefilterDialog}
      />

      {/* NEW CHAT MODAL */}
      <NewChatModal
        open={openNewChatDialog}
        onOpenChange={handleCloseNewChat}
      />

      <div className="d-flex justify-content-between align-items-center border-bottom p-2">
        <h2 className="fw-semibold">Chats</h2>

        <div className="d-flex gap-2">
          <Tooltip text="Add new contact" bgColor="blue" textColor="white" position="top">
            <Button
            onClick={handleOpenNewChat}
            // className="btn btn-primary d-flex align-items-center gap-1"
            variant="primary"
            size="sm"
          >
            <FaPlus />
            {/* <span>New Chat</span> */}
          </Button>
          </Tooltip>

         <Tooltip text="Filter chats from here" bgColor="yellow" textColor="black" position="bottom">
           <Button
            onClick={handleOpenfilterDialog}
            // className="btn btn-primary d-flex align-items-center gap-1"
            variant="primary"
            size="sm"
          >
            <FaFilter />
          </Button>
         </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ChatItemHeader;
