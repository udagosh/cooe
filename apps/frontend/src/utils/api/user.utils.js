import axios from "axios";
async function getUser(user, token) {
  const res = await axios.post(
    "http://127.0.0.1:8000/user/create",
    { userId: user.sub, user_email: user.email },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  return res;
}

export { getUser };
