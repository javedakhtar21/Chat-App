import React, { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { FilterChatModal } from "../Modals/FilterChatModal";
import { NewChatModal } from "../Modals/AddChatModal";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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

      <NewChatModal
        open={openNewChatDialog}
        onOpenChange={handleCloseNewChat}
      />

      <div className="d-flex justify-content-between align-items-center border-bottom p-2">
        <h2 className="fw-semibold">Chats</h2>

        <div className="d-flex gap-2">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Add new contact</Tooltip>}
          >
            <Button
              onClick={handleOpenNewChat}
              variant="primary"
              size="sm"
            >
              <FaPlus />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Filter chats from here</Tooltip>}
          >
            <Button
              onClick={handleOpenfilterDialog}
              variant="primary"
              size="sm"
            >
              <FaFilter />
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default ChatItemHeader;
