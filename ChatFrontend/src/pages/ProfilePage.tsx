import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../features/auth";
import { userService } from "../features/users";
import type { User } from "../features/users/types";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import LogoutConfirmModal from "../components/common/LogoutConfirmModal";
import { EnumProfileFormMode } from "../features/users/types";
import type { ProfileFormData } from "../features/users/types";
import { statesService } from "../Utils/Data/State";
import type { IState } from "../Utils/Data/State";
import { getToastErrorMessage, toast } from "../components/toast";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
  FaPencilAlt,
} from "react-icons/fa";

const initialProfileFormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
  state: "",
  city: "",
};

const genderOptions = ["Male", "Female ", "Other"];

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [mode, setMode] = useState(EnumProfileFormMode.VIEW);
  const [profileFormData, setProfileFormData] = useState<ProfileFormData>(
    initialProfileFormDataState,
  );

  const [states, setStates] = useState<IState[]>([]);
  const [citiesOfTheState, setCitiesOfTheState] = useState([]);
  const [citiesOfTheStateLoading, setCitiesOfTheStateLoading] = useState(false);
  // UI-only: controls visibility of the logout confirmation modal
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchStates = async () => {
      toast.dismiss();

      try {
        const response = await statesService.getStates();
        if (response.success) {
          setStates(response?.data);
        }
      } catch (error: unknown) {
        toast.error(getToastErrorMessage(error, "Failed to fetch states"));
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      toast.dismiss();

      if (!userId) {
        toast.warning("User ID not provided");
        setLoading(false);
        return;
      }

      try {
        const userData = await userService.getUserById(Number(userId));
        if (userData) {
          setUser(userData);
          setProfileFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender,
            state: userData.state,
            city: userData.city,
          });
        }
      } catch (err) {
        toast.error(getToastErrorMessage(err, "Failed to load user details"));
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleLogout = () => {
    toast.dismiss();
    authService.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    toast.dismiss();
    setMode(EnumProfileFormMode.EDIT);
  };

  const handleProfileFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setMode(EnumProfileFormMode.VIEW);
  };

  const handleSaveChanges = async () => {
    toast.dismiss();

    try {
      setEditLoading(true);
      const response = await userService.updateUserDetails(
        Number(userId),
        profileFormData,
      );
      setUser(response || null);
      toast.success(response.message || "Profile updated successfully");
      setMode(EnumProfileFormMode.VIEW);
    } catch (error) {
      toast.error(getToastErrorMessage(error, "Failed to update user details"));
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      toast.dismiss();

      try {
        if (!profileFormData.state) return;

        setCitiesOfTheStateLoading(true);

        const selectedState = profileFormData.state.toLowerCase();

        const matchedState = states.find(
          (state) => state?.name?.toLowerCase() === selectedState,
        );

        if (!matchedState) return;

        const response = await statesService.getCitiesByState(matchedState);

        if (response?.success) {
          setCitiesOfTheState(response.data);
        }
      } catch (error: unknown) {
        toast.error(getToastErrorMessage(error, "Failed to fetch cities"));
      } finally {
        setCitiesOfTheStateLoading(false);
      }
    };

    fetchCities();
  }, [profileFormData.state, states]);

  if (loading) {
    return (
      // UI-only: full-height centered loader for consistent vertical alignment
      <Container className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3 mb-0">Loading profile...</p>
      </Container>
    );
  }

  const isCurrentUser = currentUser?.userId === user?.userId;
  // UI-only: single flag to drive disabled state; behavior identical to the
  // previous EDIT/VIEW duplicated inputs (inputs stay disabled outside EDIT).
  const isEditing = mode === EnumProfileFormMode.EDIT;

  return (
    // UI-only: two-section split layout matching the Reset Password page
    <main className="container-fluid bg-light">
      <div className="row min-vh-100">
        {/* UI-only: LEFT — branding/identity panel */}
        <section className="auth-split-section auth-brand-panel d-flex flex-column p-4 p-lg-5">
          {/* UI-only: back button at the top of the brand panel */}
          <Button
            variant="light"
            onClick={handleBack}
            className="align-self-start rounded-3 mb-4"
          >
            &larr; Back
          </Button>

          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div className="w-100 text-center" style={{ maxWidth: "420px" }}>
              <div
                className="rounded-circle bg-white text-primary d-inline-flex align-items-center justify-content-center mx-auto mb-3 shadow fw-bold text-uppercase"
                style={{ width: "120px", height: "120px", fontSize: "44px" }}
              >
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </div>
              <h2 className="fw-bold mb-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <span className="badge rounded-pill bg-white text-primary mb-4">
                User ID: {user?.userId}
              </span>

              {/* UI-only: quick contact info list */}
              <ul className="list-unstyled mb-0 text-start mx-auto d-flex flex-column gap-3">
                <li className="d-flex align-items-start gap-3">
                  <span className="mt-1">
                    <FaEnvelope />
                  </span>
                  <div className="min-w-0">
                    <small className="d-block opacity-75">Email</small>
                    <span className="fw-semibold text-break">
                      {user?.email || "NA"}
                    </span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="mt-1">
                    <FaPhoneAlt />
                  </span>
                  <div className="min-w-0">
                    <small className="d-block opacity-75">Phone</small>
                    <span className="fw-semibold">
                      {user?.phoneNumber || "NA"}
                    </span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="mt-1">
                    <FaMapMarkerAlt />
                  </span>
                  <div className="min-w-0">
                    <small className="d-block opacity-75">Location</small>
                    <span className="fw-semibold">
                      {[user?.city, user?.state].filter(Boolean).join(", ") ||
                        "NA"}
                    </span>
                  </div>
                </li>
              </ul>

              {isCurrentUser && (
                <div className="d-grid mt-4">
                  <Button
                    variant="light"
                    // UI-only: open confirmation modal instead of logging out immediately
                    onClick={() => setShowLogoutConfirm(true)}
                    className="rounded-3 d-inline-flex align-items-center justify-content-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* UI-only: RIGHT — details form section */}
        <section className="auth-split-section d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "640px" }}>
            <Card className="border-0 shadow rounded-4">
              {/* UI-only: card header with title + inline edit actions (tighter padding) */}
              <Card.Header className="bg-white border-0 d-flex flex-wrap align-items-center justify-content-between gap-2 px-4 pt-3 pb-0">
                <div>
                  <h5 className="fw-bold mb-1">Profile Details</h5>
                  <p className="text-muted small mb-0">
                    {isEditing
                      ? "Update your information and save changes."
                      : "Your personal account information."}
                  </p>
                </div>
                {isCurrentUser && (
                  <div className="d-flex gap-2">
                    {mode === EnumProfileFormMode.VIEW && (
                      <Button
                        variant="primary"
                        onClick={handleEdit}
                        className="rounded-3 shadow-sm d-inline-flex align-items-center gap-2"
                      >
                        <FaPencilAlt size={14} />
                        Edit Profile
                      </Button>
                    )}
                    {mode === EnumProfileFormMode.EDIT && (
                      <>
                        <Button
                          variant="outline-secondary"
                          onClick={handleCancel}
                          className="rounded-3"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={handleSaveChanges}
                          disabled={editLoading}
                          className="rounded-3 shadow-sm"
                        >
                          {editLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </Card.Header>

              {/* UI-only: tighter padding to reduce overall vertical height */}
              <Card.Body className="p-4">
                {/* UI-only: section — Personal Information */}
                <div className="d-flex align-items-center gap-2 text-uppercase text-muted small fw-semibold mb-2">
                  <FaUser size={13} />
                  Personal Information
                </div>
                {/* UI-only: responsive 2-column grid (md+ side-by-side, mobile stacks) */}
                <div className="row g-3">
                  {/* UI-only: register-form-column forces true 50% width at md+ (overrides PrimeFlex) */}
                  <div className="col-12 col-md-6 register-form-column">
                    <label
                      htmlFor="firstName"
                      className="form-label fw-semibold"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control rounded-3"
                      value={profileFormData?.firstName}
                      name="firstName"
                      onChange={handleProfileFormChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-12 col-md-6 register-form-column">
                    <label htmlFor="lastName" className="form-label fw-semibold">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control rounded-3"
                      value={profileFormData?.lastName}
                      name="lastName"
                      onChange={handleProfileFormChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-12 col-md-6 register-form-column">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control rounded-3"
                      value={profileFormData?.email}
                      name="email"
                      onChange={handleProfileFormChange}
                      disabled={true}
                    />
                    {/* UI-only: clarify why email is locked */}
                    <small className="text-muted">Email cannot be changed.</small>
                  </div>

                  <div className="col-12 col-md-6 register-form-column">
                    <label
                      htmlFor="phoneNumber"
                      className="form-label fw-semibold"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-control rounded-3"
                      value={profileFormData?.phoneNumber}
                      name="phoneNumber"
                      onChange={handleProfileFormChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="col-12 col-md-6 register-form-column">
                    <label htmlFor="gender" className="form-label fw-semibold">
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="form-select rounded-3"
                      value={profileFormData?.gender}
                      name="gender"
                      onChange={handleProfileFormChange}
                      disabled={!isEditing}
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* UI-only: section — Location (reduced top margin to save height) */}
                <div className="d-flex align-items-center gap-2 text-uppercase text-muted small fw-semibold mt-3 mb-2">
                  <FaMapMarkerAlt size={13} />
                  Location
                </div>
                {/* UI-only: responsive 2-column grid (md+ side-by-side, mobile stacks) */}
                <div className="row g-3">
                  <div className="col-12 col-md-6 register-form-column">
                    <label htmlFor="state" className="form-label fw-semibold">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      className="form-select rounded-3"
                      onChange={handleProfileFormChange}
                      value={profileFormData?.state}
                      disabled={!isEditing}
                    >
                      {states &&
                        states.length >= 1 &&
                        states.map((s) => {
                          return (
                            <option key={s.name} value={s.name}>
                              {s.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="col-12 col-md-6 register-form-column">
                    <label htmlFor="city" className="form-label fw-semibold">
                      City
                    </label>
                    <select
                      id="city"
                      value={profileFormData?.city}
                      name="city"
                      className="form-select rounded-3"
                      onChange={handleProfileFormChange}
                      disabled={!isEditing}
                    >
                      <option value="">
                        {citiesOfTheStateLoading ? "loading..." : "Select city"}
                      </option>
                      {Array.isArray(citiesOfTheState) &&
                        citiesOfTheState.length > 0 &&
                        citiesOfTheState.map((city: any) => {
                          return (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>
      </div>

      {/* UI-only: reusable logout confirmation modal */}
      <LogoutConfirmModal
        show={showLogoutConfirm}
        onHide={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          // Existing logout logic is invoked here, unchanged.
          handleLogout();
        }}
      />
    </main>
  );
};

export default ProfilePage;
