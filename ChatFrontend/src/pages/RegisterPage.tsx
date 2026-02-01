import { useState } from "react";
import Button from "../components/ui/Button/TButton";

const RegisterPage = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData: ", formData);


  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-sm p-4 rounded-4 mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h3 className="text-center text-primary mb-4">Register Here</h3>

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
              />
            </div>
          </div>

          <div className="d-grid">
            <Button type="submit" variant="primary" size="md">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage ;
