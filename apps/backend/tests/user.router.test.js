import fetch from 'node-fetch'
import { faker } from "@faker-js/faker";

async function testSaveRandomUser() {
    const res = await fetch("http://localhost:5000/user/register", {
        "method": 'POST',
        "headers": {
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
        if (!res.ok) {
            throw new Error("network is not stable")
        }
        return res.text()
    })

    console.log(res)
}


async function saveNRandomUsers(n){
    for (let index = 0; index < n; index++) {
        await testSaveRandomUser()
    }
}


async function testGetUser(userId){
    const user = await fetch(`http://localhost:5000/user/${userId}`,{
        "method": 'GET',
        "headers": {
            'accept': "application/json"
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error("network is not stable")
        }
        return res.json()
    })

    return user
}
console.log(await testGetUser("a565d179-9886-4ecd-ac4c-ccc18b9df3b5"))