export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 25;

export type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    label: `At least ${PASSWORD_MIN_LENGTH} characters`,
    test: (value) => value.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "number",
    label: "At least 1 number",
    test: (value) => /\d/.test(value),
  },
  {
    id: "lowercase",
    label: "At least 1 lowercase letter",
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: "uppercase",
    label: "At least 1 uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "special",
    label: "At least 1 special character",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export type PasswordRuleResult = PasswordRule & { passed: boolean };

export const getPasswordRuleResults = (value: string): PasswordRuleResult[] =>
  PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(value) }));

export const getPasswordScore = (value: string): number =>
  PASSWORD_RULES.reduce(
    (score, rule) => (rule.test(value) ? score + 1 : score),
    0,
  );

export type PasswordStrengthLabel = "Easy" | "Medium" | "Strong" | "";

export type PasswordStrength = {
  score: number;
  percent: number;
  label: PasswordStrengthLabel;
  color: string;
};

export const getPasswordStrength = (value: string): PasswordStrength => {
  const score = getPasswordScore(value);
  const percent = (score / PASSWORD_RULES.length) * 100;

  let label: PasswordStrengthLabel = "";
  let color = "#EF4444";

  if (score >= 5) {
    label = "Strong";
    color = "#10B981";
  } else if (score >= 3) {
    label = "Medium";
    color = "#F59E0B";
  } else if (score >= 1) {
    label = "Easy";
    color = "#EF4444";
  }

  return { score, percent, label, color };
};

export const validateStrongPassword = (value: string): string | undefined => {
  if (!value) return "Password is required";
  if (value.length > PASSWORD_MAX_LENGTH)
    return `Password must be at most ${PASSWORD_MAX_LENGTH} characters`;
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  if (!/\d/.test(value)) return "Password must contain at least 1 number";
  if (!/[a-z]/.test(value))
    return "Password must contain at least 1 lowercase letter";
  if (!/[A-Z]/.test(value))
    return "Password must contain at least 1 uppercase letter";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Password must contain at least 1 special character";
  return undefined;
};

export const validateSimplePassword = (value: string): string | undefined => {
  if (!value) return "Password is required";
  if (value.length > PASSWORD_MAX_LENGTH)
    return `Password must be at most ${PASSWORD_MAX_LENGTH} characters`;
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  return undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | undefined => {
  if (!confirmPassword) return "Confirm Password is required";
  if (confirmPassword !== password) return "Passwords must match";
  return undefined;
};

export const isStrongPasswordValid = (value: string): boolean =>
  validateStrongPassword(value) === undefined;
