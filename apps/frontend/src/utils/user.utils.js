async function registerUser(user, token) {
    console.log(token)

    const res = await fetch("http://localhost:5000/user/register", {
        "method": 'POST',
        "headers": {
            "content-type": "application/json",
            "authorization":`Bearer ${token}`
        },
        "body": JSON.stringify({
            "user_id": user.sub,
            "email": user.email
        })

    }).then(res => {
        console.log(res)
        return res.text()
    })
    return res
}

export {registerUser}