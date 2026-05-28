import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { authService } from "../features/auth";
import { customSocket } from "../socket";
import { getToastErrorMessage, toast } from "../components/toast";
const LoginPage = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
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
    setLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // connect socket
        customSocket.auth = {
          token: response.token,
        };
        customSocket.connect();
        toast.success(response.message || "Login successful");
        navigate("/user/dashboard");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (err: unknown) {
      toast.error(getToastErrorMessage(err, "Login failed. Please try again."));
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
              <h1 className="display-5 fw-bold mb-3">Welcome back</h1>
              <p className="lead mb-4 opacity-75">
                Continue your conversations, reconnect with friends, and keep
                your chats moving in one clean workspace.
              </p>
              <div className="border-0 rounded-4 p-4 bg-white text-dark shadow-sm">
                <p className="mb-1 fw-semibold text-primary">
                  Fast, simple, connected
                </p>
                <small className="text-muted">
                  Sign in to access your dashboard and start chatting instantly.
                </small>
              </div>
            </div>
          </section>

          <section className="auth-split-section d-flex align-items-center justify-content-center p-4 p-lg-5">
            <div className="w-100" style={{ maxWidth: "460px" }}>
              <div className="card border-0 shadow rounded-4">
                <div className="card-body p-4 p-lg-5">
              <div className="mb-4">
                <span className="badge rounded-pill text-bg-primary mb-3">
                  Login
                </span>
                <h2 className="fw-bold mb-2">Sign in to your account</h2>
                <p className="text-muted mb-0">
                  Enter your credentials to continue to Talksy.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    className="form-control rounded-3"
                    value={formData.email}
                    placeholder="Enter email or phone number"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
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

                <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="rounded-3 shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

              <p className="text-center mt-4 mb-0 text-muted">
                Don't have an account?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Create account
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

export default LoginPage;
