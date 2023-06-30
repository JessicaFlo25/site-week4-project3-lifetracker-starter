const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {BadRequestError, NotFoundError} = require('./utils/errors')
const authRoutes = require("./routes/auth")
const {PORT} = require("./config")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.use("/auth", authRoutes)


app.use((err,req,res,next) => {
    return next(new NotFoundError())

})


app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
})



app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`)
})
