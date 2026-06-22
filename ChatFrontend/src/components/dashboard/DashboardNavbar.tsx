import { Container, Dropdown, Navbar } from "react-bootstrap";

const DashboardNavbar = ({
  currentUser,
  handleViewProfile,
  setShowLogoutConfirm,
}: any) => {
  return (
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
              <Dropdown.Item
                // UI-only: open confirmation modal instead of logging out immediately
                onClick={() => setShowLogoutConfirm(true)}
                className="text-danger"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
