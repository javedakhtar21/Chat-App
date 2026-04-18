import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { authService } from "../features/auth";
import { customSocket } from "../socket";

const LoginPage = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
        navigate("/user/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-4 rounded-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h3 className="text-center text-primary mb-4">Welcome Back</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleInputChange}
              className="form-control"
              value={formData.email}
              placeholder="Enter email or phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              className="form-control"
              value={formData.password}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="registerText">
            <small>register here</small>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
