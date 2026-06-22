import React from "react";
import { HelperFunctionsClass } from "../../Utils/HelperFunctions/HelperFunctions";

const ConversationListItem: React.FC<any> = ({
  conversation,
  isSelected,
  onClick,
}: any) => {
  const { user } = conversation;

  return (
    <div
      className={`p-3 border-bottom cursor-pointer ${
        isSelected ? "bg-primary bg-opacity-10" : ""
      }`}
      onClick={() => onClick(conversation)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-2"
          style={{ width: "40px", height: "40px" }}
        >
          {HelperFunctionsClass.getInitials(user.firstName, user.lastName)}
        </div>
        <div>
          <h6 className="mb-0">
            {user.firstName} {user.lastName}
          </h6>
          <small className="text-muted text-truncate d-block">{user.email}</small>
          {conversation.lastMessage && (
            <small className="text-muted text-truncate d-block">
              {conversation.lastMessage}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListItem;
