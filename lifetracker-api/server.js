const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {BadRequestError, NotFoundError} = require('./utils/errors')
const authRoutes = require("./routes/auth")
const {PORT} = require("./config")
const nutritionRoutes = require("./routes/nutritionroutes")
const app = express()
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());


app.use("/auth", authRoutes)

app.use("/nutrition", nutritionRoutes)


app.use("/", (req, res, next) => {
    return res.status(200).json({ ping: "pong" });
})

app.use((req, res, next) => {
    return next(new NotFoundError());
})


app.use(function (err, req, res, next) {
    // if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
    console.log("message", message); 
    return res.status(status).json({
      error: { message, status },
    })
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
