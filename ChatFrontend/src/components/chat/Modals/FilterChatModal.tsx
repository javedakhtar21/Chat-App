import React from "react";
import { FaFacebookMessenger, FaHeart } from "react-icons/fa";

interface IFilterChatModalProps {
  open: boolean;
  onOpenChange: () => void;
}

export const FilterChatModal: React.FC<IFilterChatModalProps> = ({
  open,
  onOpenChange,
}) => {
  console.log("Value of Open in FilterChatModal: ", open);
  console.log("Type of onOpenChange in FilterChatModal: ", typeof onOpenChange);

  if (open) {
    return (
      <div className="bg-light text-black p-3 d-flex-col">
        <div>
          <p className="fw-bold">Filter chats by</p>
        </div>
        <div className="d-flex justify-content-between gap-2 list-group">
          <button className="btn btn-secondary list-item">
            {<FaFacebookMessenger />} Unread
          </button>
          <button className="btn btn-secondary list-item">
            {<FaHeart />} Favorites
          </button>
          <button className="btn btn-secondary list-item">
            {<FaHeart />} Contacts
          </button>
          <button className="btn btn-secondary list-item">
            {<FaHeart />} Non-contacts
          </button>
          <button className="btn btn-secondary list-item">
            {<FaHeart />} Groups
          </button>
          <button className="btn btn-secondary list-item">
            {<FaHeart />} Drafts
          </button>
        </div>
        <div className="mt-2">
          <button className="btn btn-danger" onClick={onOpenChange}>
            Close
          </button>
        </div>
      </div>
    );
  }
};
