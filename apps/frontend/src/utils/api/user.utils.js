async function getUser(user, token) {
  const res = await fetch("http://localhost:8000/user/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: user.sub,
      user_email: user.email,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export { getUser };
