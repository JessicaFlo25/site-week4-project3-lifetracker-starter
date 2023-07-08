require("dotenv").config()
// require("colors")


const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgress"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS): "postgress"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"


    return process.env.DATBASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const BCRYPT_WORK_FACTOR = 13
const SECRET_KEY = process.env.SECRET_KEY

console.log("App Config")
console.log("PORT:", PORT)
console.log("Database URI:", getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
    SECRET_KEY
}