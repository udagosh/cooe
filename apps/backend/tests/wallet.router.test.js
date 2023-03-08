import assert from 'node:assert'
import { walletSchema } from "../src/db-utils/schemas.js";
import test from 'ava'

// test("create a new wallet", async(t) => {
//     const walletObj = {
//         "user_id": "b9c37e9c-e30c-49da-83ac-8c1683bf6d53",
//         "balance": 10
//     }
//     const res = await fetch(`http://localhost:5000/wallet`, {
//         "method": 'POST', 
//         "headers": {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         "body": JSON.stringify(walletObj)
//     }).then(res => {
//         return res.json()
//     })
//     const wallet = walletSchema.parse(res, {strip: true})
//     t.deepEqual(wallet, walletObj)
// })


