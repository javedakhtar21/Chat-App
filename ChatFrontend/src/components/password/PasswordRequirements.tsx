import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import {
  getPasswordRuleResults,
  getPasswordStrength,
} from "../../Utils/Validation/passwordValidation";

type PasswordRequirementsProps = {
  value: string;
  className?: string;
  showStrength?: boolean;
  showChecklist?: boolean;
};

const PasswordRequirements = ({
  value,
  className = "",
  showStrength = true,
  showChecklist = true,
}: PasswordRequirementsProps) => {
  const rules = getPasswordRuleResults(value);
  const strength = getPasswordStrength(value);
  const showStrengthBar = showStrength && value.length > 0;

  return (
    <div className={`${className}`}>
      {showStrengthBar && (
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted">Password strength</small>
            <small className="fw-semibold" style={{ color: strength.color }}>
              {strength.label}
            </small>
          </div>
          <div
            className="progress"
            style={{ height: "6px" }}
            role="progressbar"
            aria-label="Password strength"
            aria-valuenow={Math.round(strength.percent)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              style={{
                width: `${strength.percent}%`,
                backgroundColor: strength.color,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>
        </div>
      )}

      {showChecklist && (
        <ul className="list-unstyled mb-0 small">
          {rules.map((rule) => (
            <li
              key={rule.id}
              className={`d-flex align-items-center gap-2 mb-1 ${
                rule.passed ? "text-success" : "text-muted"
              }`}
            >
              {rule.passed ? (
                <FaCheckCircle aria-hidden="true" />
              ) : (
                <FaRegCircle aria-hidden="true" />
              )}
              <span>{rule.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordRequirements;
