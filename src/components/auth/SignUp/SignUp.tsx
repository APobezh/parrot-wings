import { FC, FormEvent } from 'react';
import './SignUp.css';
import Button from '../../home/common/Button/Button';

const SignUp: FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submit Sign Up form")
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" required />

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <Button type="submit">Register</Button>
    </form>
  );
};

export default SignUp;
