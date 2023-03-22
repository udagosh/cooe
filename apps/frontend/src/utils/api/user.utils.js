import axios from "axios";
async function getUser(user, token) {
  const res = axios.post("http://localhost:8000/user/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: user.sub,
      user_email: user.email,
    }),
  });
  return res;
}

export { getUser };
