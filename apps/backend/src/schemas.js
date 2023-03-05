import {z} from 'zod'

const userSchema = z.object({
    "user_id": z.string(),
    "email": z.string().email(),
    "address": z.object({
        "fullname": z.string().max(30, {message: "name must be less than 30 characters"}),
        "mobile": z.number().int().positive().finite(),
        "pincode": z.number().int().positive().finite(),
        "state": z.string().max(30, {message: "state must be less than 30 characters"}),
        "place": z.string().max(30, {message: "place must be less than 30 characters"}),
        "detail_address": z.string().max(100, {message: "address must be less than 100 characters"})
    })
})


export {userSchema}
