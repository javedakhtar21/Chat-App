import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../../features/auth";
import { customSocket } from "../../socket";
import { toast } from "../toast";
import LogoutConfirmModal from "../common/LogoutConfirmModal";
import { HelperFunctionsClass } from "../../Utils/HelperFunctions/HelperFunctions";
import { useConversation } from "../../features/conversation/useConversation";
import DashboardNavbar from "./DashboardNavbar";
import ChatPanel from "./ChatPanel";
import ConversationSidebar from "./ConversationSidebar";
import NewConversationModal from "./NewConversationModal";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { conversations, loading, error } = useConversation();
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [msg, setMsg] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const currentUser = authService.getCurrentUser();

  // add new conversation states
  const [showNewConversationModal, setShowNewConversationModal] =
    useState(false);

  const handleLogout = async () => {
    await HelperFunctionsClass.logoutHandler(navigate);
  };

  const handleViewProfile = () => {
    if (currentUser?.userId) {
      navigate(`/user/profile/${currentUser.userId}`);
    }
  };

  const handleSendMsg = () => {
    toast.dismiss();
    const trimmedMessage = msg.trim();

    if (!trimmedMessage) {
      toast.warning("Please enter a message before sending");
      return;
    }

    customSocket.emit("sendMsg", {
      receiverId:
        selectedConversation?.user?.userId ?? selectedConversation?.userId,
      message: trimmedMessage,
    });
    toast.success(
      `Message sent to ${selectedConversation?.user?.firstName ?? ""} ${selectedConversation?.user?.lastName ?? ""}, msg: ${trimmedMessage}`,
    );
    setMsg("");
  };

  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log("Message received", data);
    };

    customSocket.on("recMsg", handleMessage);

    return () => {
      customSocket.off("recMsg", handleMessage);
    };
  }, []);

  const handleMsgBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMsg(value);
  };

  // conversation list chat means recent conversation
  const handleConversationClick = (conversation: any) => {
    setSelectedConversation(conversation);
  };

  // handle start new chat
  const handleStartNewConversation = () => {
    setShowNewConversationModal(true);
  };

  // handle close new conversation modal
  const handleCloseNewConversationModal = () => {
    setShowNewConversationModal(false);
  };

  const handleSelectedConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowNewConversationModal(false);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <DashboardNavbar
        currentUser={currentUser}
        handleViewProfile={handleViewProfile}
        setShowLogoutConfirm={setShowLogoutConfirm}
      />

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        <ConversationSidebar
          searchText={searchText}
          setSearchText={setSearchText}
          conversations={conversations}
          loading={loading}
          error={error}
          handleStartNewConversation={handleStartNewConversation}
          selectedConversation={selectedConversation}
          handleConversationClick={handleConversationClick}
        />

        <ChatPanel
          msg={msg}
          selectedUser={selectedConversation}
          getInitials={HelperFunctionsClass.getInitials}
          handleMsgBox={handleMsgBox}
          handleSendMsg={handleSendMsg}
        />

        <LogoutConfirmModal
          show={showLogoutConfirm}
          onHide={() => setShowLogoutConfirm(false)}
          onConfirm={() => {
            setShowLogoutConfirm(false);
            handleLogout();
          }}
        />

        <NewConversationModal
          show={showNewConversationModal}
          onHide={handleCloseNewConversationModal}
          onConfirm={handleSelectedConversation}
        />
      </div>
    </div>
  );
};

export default Dashboard;
