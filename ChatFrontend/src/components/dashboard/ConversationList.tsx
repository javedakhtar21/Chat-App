import React from "react";
import ConversationListItem from "./ConversationListItem";

interface ConversationListProps {
  conversations: any[];
  loading: boolean;
  error: string;
  handleStartNewChat: () => void;
  selectedConversation: any;
  handleConversationClick: (conversation: any) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  loading,
  error,
  handleStartNewChat,
  selectedConversation,
  handleConversationClick,
}) => {  if (loading) {
    return <div className="text-center p-3">Loading conversations...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-3 text-danger">
        Failed to load conversations
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center gap-3 p-3">
        <div>No conversations found</div>
        <button className="btn btn-primary btn-sm" onClick={handleStartNewChat}>
          Start a new chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow-1 overflow-auto">
      {conversations.map((conversation: any) => (
        <ConversationListItem
          key={conversation.conversationId}
          conversation={conversation}
          isSelected={
            selectedConversation?.conversationId === conversation.conversationId
          }
          onClick={handleConversationClick}
        />
      ))}
    </div>
  );
};

export default ConversationList;