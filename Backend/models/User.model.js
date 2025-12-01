import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    Name: {type: String , required: true},
    CNIC: {type: String , required: true , unique : true},
    Email : {type: String , required: true , unique: true},
    Password: {type: String , required: true} ,
    role: {type: String , enum: ["admin" , "user" ] , default: "user" } ,
    DateCreated : {type: Date , default: Date.now}
})

const User = mongoose.model("User" , userSchema)
export default User