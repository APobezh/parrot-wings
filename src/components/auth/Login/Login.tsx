import React, { useEffect, useState } from "react";
import Button from "../../home/common/Button/Button";
import { checkUserCredentials } from "../../api/api";
import "./Login.css";

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Sign In form");
    // const [credentialsResult, setCredentialsResult] = useState<{ isExist: boolean, isAuthorized: boolean } | null>(null);

    // useEffect(() => {
    //     const checkCredentials = async () => {
    //     try {
    //         const checkCredentialsResult = await checkUserCredentials();();
    //         setCredentialsResult(checkCredentialsResult);
    //     } catch (error: any) {
    //         console.error(error.message);
    //     }
    //     };

    //     checkCredentials();
    // }, []);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default Login;
