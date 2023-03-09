async function getUser(user, token) {
  // const res = await fetch("http://localhost:5000/user", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({
  //     user_id: user.sub,
  //     email: user.email,
  //   }),
  // });
  // return res;
}

export { getUser };
