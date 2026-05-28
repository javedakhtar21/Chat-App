import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../../features/auth";
import { userService } from "../../features/users";
import type { User } from "../../features/users/types";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { customSocket } from "../../socket";
import { getToastErrorMessage, toast } from "../toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        const filteredUsers = allUsers.filter(
          (user) => user._id !== currentUser?.id,
        );
        setUsers(filteredUsers);
      } catch (error) {
        toast.error(getToastErrorMessage(error, "Failed to fetch users"));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser?.id]);

  const handleLogout = () => {
    toast.dismiss();
    authService.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleViewProfile = () => {
    if (currentUser?.userId) {
      navigate(`/user/profile/${currentUser.userId}`);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );

  const handleSendMsg = () => {
    toast.dismiss();
    const trimmedMessage = msg.trim();

    if (!trimmedMessage) {
      toast.warning("Please enter a message before sending");
      return;
    }

    customSocket.emit("sendMsg", trimmedMessage);
    toast.success("Message sent");
    setMsg("");
  };

  const handleMsgBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMsg(value);
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Full Width Navbar */}
      <Navbar
        className="bg-white border-bottom px-3"
        expand="lg"
        style={{ height: "60px" }}
      >
        <Container fluid>
          <Navbar.Brand className="fw-bold text-primary">Talksy</Navbar.Brand>
          <div className="d-flex align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                id="profile-dropdown"
                className="d-flex align-items-center gap-2"
              >
                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
                  style={{ width: "32px", height: "32px", fontSize: "12px" }}
                >
                  {currentUser?.firstName?.[0]}
                  {currentUser?.lastName?.[0]}
                </div>
                <span className="d-none d-md-inline">
                  {currentUser?.firstName}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled className="fw-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </Dropdown.Item>
                {/* <Dropdown.Item disabled className="text-muted small">
                  {currentUser?.email}
                </Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleViewProfile}>
                  View Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Left Sidebar - User List */}
        <div
          className="border-end d-flex flex-column"
          style={{ width: "350px", minWidth: "300px" }}
        >
          {/* Sidebar Header */}
          <div className="p-3 border-bottom bg-light">
            <h5 className="mb-3">Chats</h5>
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

          {/* User List */}
          <div className="flex-grow-1 overflow-auto">
            {loading ? (
              <div className="text-center p-3">Loading...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center p-3 text-muted">No users found</div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`p-3 border-bottom cursor-pointer ${
                    selectedUser?._id === user._id
                      ? "bg-primary bg-opacity-10"
                      : ""
                  }`}
                  onClick={() => handleUserClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-2"
                      style={{ width: "40px", height: "40px" }}
                    >
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </div>
                    <div>
                      <h6 className="mb-0">
                        {user.firstName} {user.lastName}
                      </h6>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-grow-1 d-flex flex-column">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-2"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {selectedUser.firstName[0]}
                    {selectedUser.lastName[0]}
                  </div>
                  <div>
                    <h6 className="mb-0">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h6>
                    <small className="text-muted">{selectedUser.email}</small>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-grow-1 p-3 bg-white">
                <div className="d-flex flex-column gap-4 justify-content-between align-items-start">
                  {/* <p>Chat with {selectedUser.firstName}</p> */}
                  {/* <small>Chat functionality coming soon...</small> */}

                  <input
                    onChange={handleMsgBox}
                    type="text"
                    placeholder="type msg to send"
                    className="form-control"
                    name="msgbox"
                    value={msg}
                  />
                  <button className="btn btn-primary" onClick={handleSendMsg}>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
              <div className="text-center text-muted">
                <h5>Welcome to Talksy</h5>
                <p>Select a user to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
