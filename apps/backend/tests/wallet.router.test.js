
async function newWallet(walletObj) {

    const res = await fetch(`http://localhost:5000/wallet/new`, {
        "method": 'POST', 
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(walletObj)
    }).then(res => {
        if (!res.ok) {
            throw new Error("network is not stable")
        }

        return res.text()
    })

    console.log(res)
}

await newWallet({
    "user_id": "b9c37e9c-e30c-49da-83ac-8c1683bf6d53",
    "balance": 10
})

