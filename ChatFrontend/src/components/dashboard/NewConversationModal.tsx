import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { FaComments } from "react-icons/fa";
import { authService } from "../../features/auth";
import { userService } from "../../features/users/services";
import type { User } from "../../features/users/types";
import { ConversationService } from "../../features/conversation/service";
import { HelperFunctionsClass } from "../../Utils/HelperFunctions/HelperFunctions";
import { toast } from "../toast";
import { getToastErrorMessage } from "../toast/toastHelpers";

interface NewConversationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (conversation: any) => void;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
  show,
  onHide,
  onConfirm,
}) => {
  const currentUser = authService.getCurrentUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [startingChat, setStartingChat] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!show) {
      setSearchText("");
      setSelectedUser(null);
      return;
    }

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const allUsers = await userService.getAllUsers();
        const otherUsers = allUsers.filter(
          (user) => user.userId !== currentUser?.userId,
        );
        setUsers(otherUsers);
      } catch (error) {
        toast.error(getToastErrorMessage(error, "Failed to fetch users"));
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [show, currentUser?.userId]);

  const filteredUsers = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return users;

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(query) || user.email.toLowerCase().includes(query)
      );
    });
  }, [users, searchText]);

  const handleStartChat = async () => {
    if (!selectedUser || !currentUser?.userId) {
      toast.warning("Please select a user to start chatting");
      return;
    }

    setStartingChat(true);
    try {
      const response = await ConversationService.createConversation(
        currentUser.userId,
        selectedUser.userId,
      );

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        toast.error(response.message || "Failed to start conversation");
        return;
      }

      const conversation = {
        conversationId:
          response.data?._id ??
          response.data?.conversationId ??
          response.data?._id,
        user: {
          userId: selectedUser.userId,
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
        },
      };

      toast.success(`Chat started with ${selectedUser.firstName}`);
      onConfirm(conversation);
      onHide();
    } catch (error) {
      toast.error(getToastErrorMessage(error, "Failed to start conversation"));
    } finally {
      setStartingChat(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={true}
      aria-labelledby="new-conversation-title"
      contentClassName="border-0 shadow rounded-4"
      size="lg"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title id="new-conversation-title" className="fw-bold h5">
          Start a new chat
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted small mb-3">
          Search and select someone to begin a conversation.
        </p>

        <Form.Control
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-3 mb-3"
          size="sm"
          disabled={loadingUsers || startingChat}
        />

        <div
          className="border rounded-3 overflow-auto"
          style={{ maxHeight: "320px" }}
        >
          {loadingUsers ? (
            <div className="d-flex justify-content-center align-items-center p-4 gap-2 text-muted">
              <Spinner animation="border" size="sm" />
              <span>Loading users...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center text-muted p-4">
              {searchText ? "No users match your search" : "No users available"}
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUser?._id === user._id;

              return (
                <div
                  key={user._id}
                  role="button"
                  tabIndex={startingChat ? -1 : 0}
                  aria-pressed={isSelected}
                  className={`w-100 border-bottom text-start p-3 d-flex align-items-center ${
                    isSelected ? "bg-primary-subtle" : ""
                  }`}
                  style={{
                    cursor: startingChat ? "not-allowed" : "pointer",
                    ...(isSelected
                      ? { boxShadow: "inset 3px 0 0 var(--bs-primary)" }
                      : {}),
                  }}
                  onClick={() => {
                    if (!startingChat) setSelectedUser(user);
                  }}
                  onKeyDown={(e) => {
                    if (
                      !startingChat &&
                      (e.key === "Enter" || e.key === " ")
                    ) {
                      e.preventDefault();
                      setSelectedUser(user);
                    }
                  }}
                >
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {HelperFunctionsClass.getInitials(
                      user.firstName,
                      user.lastName,
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <div className="fw-semibold text-truncate">
                      {user.firstName} {user.lastName}
                    </div>
                    <small className="text-muted text-truncate d-block">
                      {user.email}
                    </small>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="outline-secondary"
          className="rounded-3"
          onClick={onHide}
          disabled={startingChat}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
          onClick={handleStartChat}
          disabled={!selectedUser || startingChat}
        >
          {startingChat ? (
            <>
              <Spinner animation="border" size="sm" />
              Starting...
            </>
          ) : (
            <>
              <FaComments />
              Start Chat
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewConversationModal;
