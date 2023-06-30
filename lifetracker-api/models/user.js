const bcrypt = require("bcrypt")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("../config")
const db = require("../db")

class User{

    static async makePublicUser(user){
        return{
            id: user.id,
            username:user.username,
            password:user.password,
            first_name:user.first_name,
            last_name: user.last_name,
            email:user.email,
            created_at:user.created_at,
            updated_at:user.updated_at

        }
    }
//if not proper format
    static async login(credentials){
        const requiredFields = ["password","email"] //does the order of the items here have to match with bottom one in the array?
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
    
        })
        const user = await User.fetchUserByEmail(credentials.email)
        //if passwords match
         if(user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid){
                return user
            }
         }

        throw new UnauthorizedError("Invalid email/password")
    }

    static async register(credentials){
        const requiredFields = ["username", "password", "first_name", "last_name", "email"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
    
        })

        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid email.")
        }


        const existingUser = await User.fetchUserByEmail(credentials.email)

        if(existingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
         const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        const lowercasedEmail = credentials.email.toLowerCase()

        const result = await db.query(`
            INSERT INTO users(
                username,
                password,
                first_name,
                last_name,
                email
            )
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `, [credentials.username, hashedPassword, credentials.first_name, credentials.last_name, lowercasedEmail])

        const user = result.rows[0]
        return User.makePublicUser(user)

    }

    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")

        }
        const query = `SELECT * FROM users WHERE email = $1`
        
        const result = await db.query(query, [email.toLowerCase()])
        
        const user = result.rows[0]

        return user
    }
}

//defining methods, essentially creating functions of use

module.exports = User