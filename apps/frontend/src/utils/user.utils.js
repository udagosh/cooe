async function registerUser(user, token) {
  const res = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: user.sub,
      email: user.email,
    }),
  }).then((res) => {
    console.log(res);
    return res.text();
  });
  return res;
}

export { registerUser };
