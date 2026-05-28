import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../features/auth";
import { getToastErrorMessage, toast } from "../components/toast";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

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

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
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

  const passwordsDoNotMatch =
    Boolean(formData.confirmPassword) &&
    formData.password !== formData.confirmPassword;

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
                        <input
                          type="password"
                          name="password"
                          id="password"
                          onChange={handleInputChange}
                          className="form-control rounded-3"
                          value={formData.password}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      <div className="col-12 col-md-6 register-form-column">
                        <label
                          htmlFor="confirmPassword"
                          className="form-label fw-semibold"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          onChange={handleInputChange}
                          className={`form-control rounded-3 ${
                            passwordsDoNotMatch ? "is-invalid" : ""
                          }`}
                          value={formData.confirmPassword}
                          placeholder="Confirm password"
                          required
                        />
                        <div className="invalid-feedback">
                          Passwords do not match.
                        </div>
                      </div>
                    </div>

                    <div className="d-grid mt-3">
                      <Button
                        type="submit"
                        variant="primary"
                        className="rounded-3 shadow-sm"
                        disabled={loading}
                      >
                        {loading ? "Registering..." : "Create Account"}
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
