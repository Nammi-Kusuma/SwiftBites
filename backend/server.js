import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//db connection
connectDB();

// api routes
app.use('/food', foodRouter);
app.use('/images', express.static('uploads'))
app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use("/order", orderRouter)

app.get('/', (req, res) => {
    res.send("working")
})

app.listen(PORT, () => {
    console.log("Server is listening")
})