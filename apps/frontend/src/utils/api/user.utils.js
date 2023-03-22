import axios from "axios";
async function getUser(user, token) {
  const options = {
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
  };
  // const res = await axios.post("http://127.0.0.1:8000/user/create", options);
  const rawres = await fetch("http://localhost:8000/user/create", options);
  const res = await rawres.json();
  console.log(res);
  return res;
}

export { getUser };
