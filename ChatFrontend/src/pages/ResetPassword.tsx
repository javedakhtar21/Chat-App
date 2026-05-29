import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Spinner from "react-bootstrap/Spinner";
import { FaEye, FaEyeSlash, FaInfoCircle, FaLock } from "react-icons/fa";
import PasswordRequirements from "../components/password/PasswordRequirements";
import {
  PASSWORD_MAX_LENGTH,
  isStrongPasswordValid,
  validateConfirmPassword,
  validateStrongPassword,
} from "../Utils/Validation/passwordValidation";

type ResetPasswordFields = {
  newPassword: string;
  confirmPassword: string;
};

type FieldErrors = Partial<ResetPasswordFields>;

type SubmitStatus = {
  type: "success" | "danger";
  message: string;
};

const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetPasswordFields>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus | null>(null);

  const validate = (values: ResetPasswordFields): FieldErrors => {
    const nextErrors: FieldErrors = {};

    const passwordError = validateStrongPassword(values.newPassword);
    if (passwordError) nextErrors.newPassword = passwordError;

    const confirmError = validateConfirmPassword(
      values.newPassword,
      values.confirmPassword,
    );
    if (confirmError) nextErrors.confirmPassword = confirmError;

    return nextErrors;
  };

  const isFormValid =
    isStrongPasswordValid(formData.newPassword) &&
    formData.confirmPassword.length > 0 &&
    formData.confirmPassword === formData.newPassword;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextValue = value.slice(0, PASSWORD_MAX_LENGTH);
    const nextData = { ...formData, [name]: nextValue };

    setFormData(nextData);
    setStatus(null);

    setErrors((prev) => {
      const updated = { ...prev };
      if (name === "newPassword") {
        updated.newPassword = validateStrongPassword(nextData.newPassword);
        if (nextData.confirmPassword) {
          updated.confirmPassword = validateConfirmPassword(
            nextData.newPassword,
            nextData.confirmPassword,
          );
        }
      } else {
        updated.confirmPassword = validateConfirmPassword(
          nextData.newPassword,
          nextData.confirmPassword,
        );
      }
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus({
        type: "success",
        message: "Your password has been updated successfully.",
      });
      setFormData({ newPassword: "", confirmPassword: "" });
    } catch {
      setStatus({
        type: "danger",
        message: "Something went wrong. Please try again.",
      });
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
              <div className="auth-logo-mark bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold shadow">
                T
              </div>
              <span className="fs-3 fw-bold">Talksy</span>
            </div>
            <h1 className="display-5 fw-bold mb-3">Set a new password</h1>
            <p className="lead mb-4 opacity-75">
              Choose a strong new password to keep your Talksy account safe and
              secure.
            </p>
            <div className="border-0 rounded-4 p-4 bg-white text-dark shadow-sm">
              <p className="mb-1 fw-semibold text-primary">Stay protected</p>
              <small className="text-muted">
                Use at least 8 characters with a mix you can remember.
              </small>
            </div>
          </div>
        </section>

        <section className="auth-split-section d-flex align-items-center justify-content-center p-4 p-lg-5">
          <div className="w-100" style={{ maxWidth: "460px" }}>
            <div className="card border-0 shadow rounded-4">
              <div className="card-body p-4 p-lg-5">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary bg-gradient text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <FaLock size={26} />
                  </div>
                  <h2 className="fw-bold mb-1">Reset Password</h2>
                  <p className="text-muted mb-0">
                    Enter your new password below
                  </p>
                </div>

                {status && (
                  <Alert
                    variant={status.type}
                    className="rounded-3"
                    role="alert"
                    aria-live="polite"
                    onClose={() => setStatus(null)}
                    dismissible
                  >
                    {status.message}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="newPassword"
                      className="form-label fw-semibold"
                    >
                      New Password
                    </label>
                    <InputGroup hasValidation>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        className={`form-control rounded-start-3 ${
                          errors.newPassword ? "is-invalid" : ""
                        }`}
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        maxLength={PASSWORD_MAX_LENGTH}
                        autoComplete="new-password"
                      />
                      <OverlayTrigger
                        trigger={["hover", "focus", "click"]}
                        placement="top"
                        overlay={
                          <Popover id="password-rules-popover">
                            <Popover.Header as="h6">
                              Password rules
                            </Popover.Header>
                            <Popover.Body>
                              <PasswordRequirements
                                value={formData.newPassword}
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
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      {errors.newPassword && (
                        <div className="invalid-feedback">
                          {errors.newPassword}
                        </div>
                      )}
                    </InputGroup>

                    <PasswordRequirements
                      value={formData.newPassword}
                      showChecklist={false}
                      className="mt-2"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label fw-semibold"
                    >
                      Confirm Password
                    </label>
                    <InputGroup hasValidation>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`form-control rounded-start-3 ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        placeholder="Re-enter new password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        maxLength={PASSWORD_MAX_LENGTH}
                        autoComplete="new-password"
                      />
                      <Button
                        type="button"
                        variant="outline-secondary"
                        className="rounded-end-3"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </InputGroup>
                  </div>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="rounded-3 shadow-sm"
                      disabled={loading || !isFormValid}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                </form>

                <p className="text-center mt-4 mb-0 text-muted">
                  Back to{" "}
                  <Link to="/login" className="fw-semibold text-decoration-none">
                    Login
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

export default ResetPassword;
