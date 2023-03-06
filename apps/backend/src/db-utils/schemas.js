import {z} from 'zod'

const userSchema = z.object({
    "user_id": z.string(),
    "email": z.string().email(),
    "address": z.object({
        "fullname": z.string().max(30, {message: "name must be less than 30 characters"}),
        "mobile": z.string(),
        "zipcode": z.string(),
        "state": z.string().max(30, {message: "state must be less than 30 characters"}),
        "place": z.string().max(30, {message: "place must be less than 30 characters"}),
        "street_address": z.string().max(100, {message: "address must be less than 100 characters"}),
        "country": z.string().max(74, {message: "place must be less than 30 characters"}),
    })
})


const walletSchema = z.object({
    "user_id": z.string(),
    "balance": z.number().int().gte(0,{"message": "balance has to be greater than  zero"}),
})

const contractSchema = z.object({
    "wallet_id": z.string(),
    "guess": z.enum(['green','red','blue','0','1','2','3','4','5','6','7','8','9']),
    "bet": z.number().positive().int().min(10,{"message": "minimum bet has to be 10"}),
    "status": z.enum(['pending','processed']),
    "won": z.number().positive().int()
})

const issueSchema = z.object({
    "issue_number": z.number().positive().int(),
    "timestamp": z.number(),
    "status": z.enum(['online', 'offline']),
    "result": z.enum(['green','red','blue','0','1','2','3','4','5','6','7','8','9']).optional()
})

export {userSchema, walletSchema, contractSchema,issueSchema}
