import { userInput } from "src/resolvers/userInput";

export const validate = (input: userInput) => {
  if (input.username.length < 3) {
    return [
      {
        field: "username",
        message: "username length should be atleast 3",
      },
    ];
  }

  if (!input.email.includes("@")) {
    return [
      {
        field: "email",
        message: "email should contain @",
      },
    ];
  }

  if (input.password.length < 3) {
    return [
      {
        field: "password",
        message: "password length should be atleast 3",
      },
    ];
  }
  return false;
};
