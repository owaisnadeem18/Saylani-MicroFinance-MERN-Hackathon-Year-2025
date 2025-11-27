import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI) 
        console.log("Mongo DB Connection")
    }
     
    catch (err) {
        console.log(`Error connecting the DB is => ${err}`)
    }
}