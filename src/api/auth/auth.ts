import axios from "axios";

interface Auth {
  username: string;
  password: string;
}

export function signin({ username, password }: Auth) {
  // Simulate a signin request

  const accessToken = axios
    .post(`${import.meta.env.VITE_DOMAIN}/auth/signin`, {
      username,
      password,
    })
    .then((response) => response.data);

  return accessToken;
}
