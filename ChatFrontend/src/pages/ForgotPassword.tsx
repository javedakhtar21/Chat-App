import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ForgotPasswordService } from "../features/forgotpassword/service";
import { useState, type ChangeEvent } from "react";
import { getToastErrorMessage, toast } from "../components/toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setEmail(value);
  };

  const handleSendResetLink = async () => {
    debugger;
    if (!email) {
      toast.warning("Email is required");
      return;
    }
    toast.dismiss();
    setLoading(true);
    try {
      const response = await ForgotPasswordService.sendResetLink(email);
      if (response.statusCode === 200) {
        toast.success(response.message || "Reset link sent successfully");
      } else {
        toast.error(response.message || "Failed to send reset link");
      }
    } catch (error) {
      const errorMessage = getToastErrorMessage(
        error,
        "Failed to send reset link",
      );
      toast.error(errorMessage);
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
            <h1 className="display-5 fw-bold mb-3">Reset your password</h1>
            <p className="lead mb-4 opacity-75">
              Enter your email or phone number and we&apos;ll help you get back
              into your Talksy account.
            </p>
            <div className="border-0 rounded-4 p-4 bg-white text-dark shadow-sm">
              <p className="mb-1 fw-semibold text-primary">Account recovery</p>
              <small className="text-muted">
                Use the same email or phone number connected to your account.
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
                    Forgot Password
                  </span>
                  <h2 className="fw-bold mb-2">Recover your account</h2>
                  <p className="text-muted mb-0">
                    We&apos;ll send password reset instructions to your account.
                  </p>
                </div>

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="resetIdentifier"
                      className="form-label fw-semibold"
                    >
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      id="resetIdentifier"
                      name="resetIdentifier"
                      className="form-control rounded-3"
                      placeholder="Enter email or phone number"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="rounded-3 shadow-sm"
                      onClick={handleSendResetLink}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </div>
                </form>

                <p className="text-center mt-4 mb-0 text-muted">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none"
                  >
                    Back to Login
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

export default ForgotPassword;
