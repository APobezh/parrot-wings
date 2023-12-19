import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Button from "../../home/common/Button/Button";
import { useAuth } from "../AuthContext";
import { validateEmail } from "../../../utils/validation";
import { registerUser, RegisterRequest } from "../../api/api";

const SignUp: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<RegisterRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setValidationErrors({ email: "Please enter a valid email address." });
      return;
    }

    setValidationErrors({ email: "" });

    try {
      // TODO: Use response message later
      await registerUser(formData);
      login();
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setError("Registration or authentication failed. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {validationErrors.email && (
        <div className="error-message">{validationErrors.email}</div>
      )}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button type="submit">Register</Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default SignUp;
