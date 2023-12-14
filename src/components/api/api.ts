import axios from "axios";

interface UserData {
  firstName: string;
  balance: number;
}

interface UserCredentialsCheckResult {
  isExist: boolean;
  isAuthorized: boolean;
}

// TODO: Update after UserController refactoring - add body
export const fetchUserData = async (): Promise<UserData> => {
  try {
    const response = await axios.get("https://localhost:5001/api/User/1");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};

// TODO #1: Return that API call to
// TODO #2: Send encrypted user password after DB schema fix
export const checkUserCredentials =
  async (): Promise<UserCredentialsCheckResult> => {
    try {
      const userCredentials = {
        userId: 1,
        userEmail: "johndoe@example.com",
        userPassword: "testpassword",
      };
      const response = await axios.post(
        "https://localhost:5001/api/User/CheckCredentials",
        userCredentials
      );
      return response.data;
    } catch (error) {
      throw new Error("Error with user credentials check");
    }
  };
