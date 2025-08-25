import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

app.use(express.json())

app.get("/" , (req ,res) => {
    res.json({
        message: "Hello World"
    })
})

const port = process.env.PORT || 3000

app.listen(port , () => {
    console.log("hello world")
})