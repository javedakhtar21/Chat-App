import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { authService } from "../features/auth";
import { userService } from "../features/users";
import type { User } from "../features/users/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { EnumProfileFormMode } from "../features/users/types";
import type { ProfileFormData } from "../features/users/types";
import { statesService } from "../Utils/Data/State";
import type { IState } from "../Utils/Data/State";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [mode, setMode] = useState(EnumProfileFormMode.VIEW);
  const [profileFormData, setProfileFormData] = useState<ProfileFormData>(
    initialProfileFormDataState,
  );

  const [states, setStates] = useState<IState[]>([]);
  const [citiesOfTheState, setCitiesOfTheState] = useState([]);
  const [citiesOfTheStateLoading, setCitiesOfTheStateLoading] = useState(false);
  const [errorCityState, setErrorCityState] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await statesService.getStates();
        if (response.success) {
          setStates(response?.data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorCityState(error.message);
        }
        console.log("Error fetching states: ", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    console.log("states: ", states);
    console.error("Error in fetching states: ", errorCityState);

    console.log("Citites are : ", citiesOfTheState);
  }, [states, citiesOfTheState,errorCityState]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setErrorMsg("User ID not provided");
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
        setErrorMsg("Failed to load user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
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
    try {
      setEditLoading(true);
      const response = await userService.updateUserDetails(
        Number(userId),
        profileFormData,
      );
      setUser(response || null);
      setSuccessMsg(response.message);
      setMode(EnumProfileFormMode.VIEW);
    } catch (error) {
      setErrorMsg("Failed to update user details");
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    console.log("current profile data: ", profileFormData);
  }, [profileFormData]);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (!profileFormData.state) return;

        setCitiesOfTheStateLoading(true);

        const selectedState = profileFormData.state.toLowerCase();

        const matchedState = states.find(
          (state: any) => state?.name?.toLowerCase() === selectedState,
        );

        if (!matchedState) return;

        const response = await statesService.getCitiesByState(matchedState);

        if (response?.success) {
          setCitiesOfTheState(response.data);
        }
      } catch (error: any) {
        console.error("Error: ", error.message);
      } finally {
        setCitiesOfTheStateLoading(false);
      }
    };

    fetchCities();
  }, [profileFormData.state, states]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  const isCurrentUser = currentUser?.userId === user?.userId;

  return (
    <Container className="py-2">
      <Button variant="dark" onClick={handleBack} className="mb-3">
        Back
      </Button>

      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <div className="text-center">
                <p className={`${successMsg ? "text-success" : "text-danger"}`}>
                  {successMsg?.toUpperCase() || errorMsg?.toUpperCase()}
                </p>
                <div
                  className="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{ width: "100px", height: "100px", fontSize: "36px" }}
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <h4 className="mb-1">
                  {user?.firstName} {user?.lastName}
                </h4>
                <span className="badge bg-secondary">
                  User ID: {user?.userId}
                </span>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  First Name
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    <input
                      type="text"
                      className="form-control"
                      value={profileFormData?.firstName}
                      name="firstName"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.firstName}
                  // </Col>

                  <Col sm={8}>
                    <input
                      type="text"
                      disabled={true}
                      className="form-control"
                      value={profileFormData?.firstName}
                      name="firstName"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Last Name
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    <input
                      type="text"
                      className="form-control"
                      value={profileFormData?.lastName}
                      name="lastName"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.lastName}
                  // </Col>

                  <Col sm={8}>
                    <input
                      type="text"
                      disabled={true}
                      className="form-control"
                      value={profileFormData?.lastName}
                      name="lastName"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                )}
              </Row>

              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Email
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    <input
                      disabled={true}
                      type="email"
                      className="form-control"
                      value={profileFormData?.email}
                      name="email"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.email}
                  // </Col>

                  <Col sm={8}>
                    <input
                      disabled={true}
                      type="email"
                      className="form-control"
                      value={profileFormData?.email}
                      name="email"
                      onChange={handleProfileFormChange}
                    />
                  </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Phone Number
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    <input
                      type="text"
                      className="form-control"
                      value={profileFormData?.phoneNumber}
                      onChange={handleProfileFormChange}
                      name="phoneNumber"
                    />
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.phoneNumber}
                  // </Col>

                  <Col sm={8}>
                    <input
                      type="text"
                      disabled={true}
                      className="form-control"
                      value={profileFormData?.phoneNumber}
                      onChange={handleProfileFormChange}
                      name="phoneNumber"
                    />
                  </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  Gender
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    <select
                      // type="text"
                      className="form-control form-select"
                      value={profileFormData?.gender}
                      name="gender"
                      onChange={handleProfileFormChange}
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.gender || "NA"}
                  // </Col>

                  <Col sm={8}>
                    <select
                      // type="text"
                      className="form-control form-select"
                      value={profileFormData?.gender}
                      name="gender"
                      disabled={true}
                      // onChange={handleProfileFormChange}
                    >
                      <option value="">Select Gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  City
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    {/* <input
                      type="text"
                      className="form-control"
                      value={profileFormData?.city}
                      name="city"
                      onChange={handleProfileFormChange}
                    /> */}

                    <select
                      value={profileFormData?.city}
                      name="city"
                      id=""
                      className="form-select form-control"
                      onChange={handleProfileFormChange}
                    >
                      <option value="">
                        {citiesOfTheStateLoading ? "loading..." : "Select city"}
                      </option>
                      {Array.isArray(citiesOfTheState) &&
                        citiesOfTheState.length > 0 &&
                        citiesOfTheState.map((city: any) => {
                          return <option value={city.name}>{city.name}</option>;
                        })}
                    </select>
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.city || "NA"}
                  // </Col>

                  <Col sm={8}>
                    {/* <input
                      type="text"
                      disabled={true}
                      className="form-control"
                      value={profileFormData?.city}
                      name="city"
                      onChange={handleProfileFormChange}
                    /> */}
                    <select
                      name="city"
                      value={profileFormData?.city}
                      id=""
                      className="form-select form-control"
                      disabled={true}
                    >
                      <option value="">
                        {citiesOfTheStateLoading ? "loading..." : "Select city"}
                      </option>
                      {Array.isArray(citiesOfTheState) &&
                        citiesOfTheState.length > 0 &&
                        citiesOfTheState.map((city: any) => {
                          return <option value={city.name}>{city.name}</option>;
                        })}
                    </select>
                  </Col>
                )}
              </Row>
              <Row className="mb-3">
                <Col sm={4} className="text-muted">
                  State
                </Col>
                {mode === EnumProfileFormMode.EDIT ? (
                  <Col sm={8}>
                    {/* <input
                      type="text"
                      className="form-control"
                      value={profileFormData?.state}
                      name="state"
                      onChange={handleProfileFormChange}
                    /> */}

                    <select
                      name="state"
                      id=""
                      className="form-select form-control"
                      onChange={handleProfileFormChange}
                      value={profileFormData?.state}
                    >
                      {states &&
                        states.length >= 1 &&
                        states.map((s) => {
                          return <option value={s.name}>{s.name}</option>;
                        })}
                    </select>
                  </Col>
                ) : (
                  // <Col sm={8} className="fw-semibold">
                  //   {user?.state || "NA"}
                  // </Col>

                  // <Col sm={8}>
                  //   <input
                  //     type="text"
                  //     disabled={true}
                  //     className="form-control"
                  //     value={profileFormData?.state}
                  //     name="state"
                  //     onChange={handleProfileFormChange}
                  //   />
                  // </Col>

                  <Col sm={8}>
                    <select
                      name="state"
                      id=""
                      className="form-select form-control"
                      onChange={handleProfileFormChange}
                      value={profileFormData?.state}
                      disabled={true}
                    >
                      {states &&
                        states.length >= 1 &&
                        states.map((s) => {
                          return <option value={s.name}>{s.name}</option>;
                        })}
                    </select>
                  </Col>
                )}
              </Row>
            </Card.Body>
            {isCurrentUser && (
              <Card.Footer className="bg-white">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {mode === EnumProfileFormMode.VIEW && (
                    <Button variant="primary" onClick={handleEdit}>
                      Edit Profile
                    </Button>
                  )}
                  {mode === EnumProfileFormMode.EDIT && (
                    <>
                      <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSaveChanges}
                        disabled={editLoading}
                      >
                        {editLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </>
                  )}
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
