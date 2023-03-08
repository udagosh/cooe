import fetch from 'node-fetch'
import { faker } from "@faker-js/faker";
import { userSchema } from '../src/db-utils/schemas.js';
import test from 'ava'


test("save random user", async (t) => {
    const res = await fetch("http://localhost:5000/user", {
        "method": 'POST',
        "headers": {
            'accept': "application/json",
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "user_id": faker.datatype.uuid(),
            "email": faker.internet.email(),
            "address": {
                "fullname": faker.name.fullName(),
                "mobile": faker.phone.number('############'),
                "zipcode": faker.address.zipCode('######'),
                "state": faker.address.state(),
                "place": faker.address.city(),
                "street_address": faker.address.streetAddress(),
                "country": faker.address.country()
            }
        })
    }).then(res => {
        return res.json()
    })

    userSchema.parse(res)
    t.pass()
})


// test("get user", async (t) => {
//     const user = await fetch(`http://localhost:5000/user/${"a565d179-9886-4ecd-ac4c-ccc18b9df3b5"}`, {
//         "method": 'GET',
//         "headers": {
//             'accept': "application/json"
//         }
//     }).then(res => {
//         return res.json()
//     })

//     userSchema.parse(user)
//     t.pass()
// })

