import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../features/auth";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phoneNumber || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);

      if (response.statusCode === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-4 rounded-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h3 className="text-center text-primary mb-4">Register Here</h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleInputChange}
                className="form-control"
                value={formData.firstName}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleInputChange}
                className="form-control"
                value={formData.lastName}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                className="form-control"
                value={formData.email}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleInputChange}
                className="form-control"
                value={formData.phoneNumber}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="row mb-4">
            <div className="col">
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
            <div className="col">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleInputChange}
                className="form-control"
                value={formData.confirmPassword}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="d-grid">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="registerText">
            <small>login here</small>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
