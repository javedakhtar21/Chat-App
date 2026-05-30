import { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { authService } from "../features/auth";
import { getToastErrorMessage, toast } from "../components/toast";
import PasswordRequirements from "../components/password/PasswordRequirements";
import {
  PASSWORD_MAX_LENGTH,
  validateConfirmPassword,
  validateStrongPassword,
} from "../Utils/Validation/passwordValidation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isPasswordField = name === "password" || name === "confirmPassword";
    const nextValue = isPasswordField
      ? value.slice(0, PASSWORD_MAX_LENGTH)
      : value;
    const nextData = { ...formData, [name]: nextValue };

    setFormData(nextData);

    if (isPasswordField) {
      setPasswordErrors((prev) => {
        const updated = { ...prev };
        if (name === "password") {
          updated.password = validateStrongPassword(nextData.password);
          if (nextData.confirmPassword) {
            updated.confirmPassword = validateConfirmPassword(
              nextData.password,
              nextData.confirmPassword,
            );
          }
        } else {
          updated.confirmPassword = validateConfirmPassword(
            nextData.password,
            nextData.confirmPassword,
          );
        }
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      toast.warning("Please fill in all fields");
      return;
    }

    const passwordError = validateStrongPassword(formData.password);
    const confirmError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );

    if (passwordError || confirmError) {
      setPasswordErrors({
        password: passwordError,
        confirmPassword: confirmError,
      });
      toast.warning(passwordError || confirmError || "Invalid password");
      return;
    }

    setLoading(true);

    try {
      const { ...registerData } = formData;
      const response = await authService.register(registerData);

      if (response.statusCode === 201) {
        toast.success(
          response?.message ||
            "Registration successful! Redirecting to login...",
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      toast.error(
        getToastErrorMessage(err, "Registration failed. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-fluid bg-light">
      <div className="row min-vh-100">
          <section className="auth-split-section auth-brand-panel d-flex align-items-center justify-content-center p-4 p-lg-5">
            <div className="w-100" style={{ maxWidth: "520px" }}>
              <div className="d-inline-flex align-items-center gap-3 mb-4">
                <div
                  className="auth-logo-mark bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold shadow"
                >
                  T
                </div>
                <span className="fs-3 fw-bold">Talksy</span>
              </div>
              <h1 className="display-6 fw-bold mb-3">Create your account</h1>
              <p className="lead mb-4 opacity-75">
                Join Talksy to discover people, manage your profile, and keep
                your chats organized in a simple modern dashboard.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <div className="border-0 rounded-4 p-3 bg-white text-dark shadow-sm h-100">
                    <p className="h4 fw-bold mb-1 text-primary">24/7</p>
                    <small className="text-muted">Stay connected</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border-0 rounded-4 p-3 bg-white text-dark shadow-sm h-100">
                    <p className="h4 fw-bold mb-1 text-primary">Easy</p>
                    <small className="text-muted">Profile setup</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="auth-split-section d-flex align-items-center justify-content-center p-4 p-lg-5">
            <div className="w-100" style={{ maxWidth: "640px" }}>
              <div className="card border-0 shadow rounded-4">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <span className="badge rounded-pill text-bg-primary mb-2">
                      Register
                    </span>
                    <h2 className="fw-bold mb-2">Start chatting today</h2>
                    <p className="text-muted mb-0">
                      Fill in your details to create your Talksy account.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="row g-3">
                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="firstName"
                          className="form-label fw-semibold"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          value={formData.firstName}
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="lastName"
                          className="form-label fw-semibold"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          value={formData.lastName}
                          placeholder="Enter last name"
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6 register-form-column">
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          value={formData.email}
                          placeholder="Enter email"
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="phoneNumber"
                          className="form-label fw-semibold"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          value={formData.phoneNumber}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="password"
                          className="form-label fw-semibold"
                        >
                          Password
                        </label>
                        <InputGroup hasValidation>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                            className={`form-control rounded-start-3 ${
                              passwordErrors.password ? "is-invalid" : ""
                            }`}
                            value={formData.password}
                            placeholder="Enter password"
                            maxLength={PASSWORD_MAX_LENGTH}
                            required
                          />
                          <OverlayTrigger
                            trigger={["hover", "focus", "click"]}
                            placement="top"
                            overlay={
                              <Popover id="register-password-rules-popover">
                                <Popover.Header as="h6">
                                  Password rules
                                </Popover.Header>
                                <Popover.Body>
                                  <PasswordRequirements
                                    value={formData.password}
                                    showStrength={false}
                                  />
                                </Popover.Body>
                              </Popover>
                            }
                          >
                            <Button
                              type="button"
                              variant="outline-secondary"
                              aria-label="Show password rules"
                            >
                              <FaInfoCircle />
                            </Button>
                          </OverlayTrigger>
                          <Button
                            type="button"
                            variant="outline-secondary"
                            className="rounded-end-3"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                          {passwordErrors.password && (
                            <div className="invalid-feedback">
                              {passwordErrors.password}
                            </div>
                          )}
                        </InputGroup>
                        <PasswordRequirements
                          value={formData.password}
                          showChecklist={false}
                          className="mt-2"
                        />
                      </div>
                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label fw-semibold"
                        >
                          Confirm Password
                        </label>
                        <InputGroup hasValidation>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={handleInputChange}
                            className={`form-control rounded-start-3 ${
                              passwordErrors.confirmPassword ? "is-invalid" : ""
                            }`}
                            value={formData.confirmPassword}
                            placeholder="Confirm password"
                            maxLength={PASSWORD_MAX_LENGTH}
                            required
                          />
                          <Button
                            type="button"
                            variant="outline-secondary"
                            className="rounded-end-3"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                          {passwordErrors.confirmPassword && (
                            <div className="invalid-feedback">
                              {passwordErrors.confirmPassword}
                            </div>
                          )}
                        </InputGroup>
                      </div>
                    </div>

                    <div className="d-grid mt-3">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-3 shadow-sm"
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>

                  <p className="text-center mt-3 mb-0 text-muted">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-decoration-none"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
      </div>
    </main>
  );
};

export default RegisterPage;
