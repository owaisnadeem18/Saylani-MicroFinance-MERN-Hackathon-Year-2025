import mongoose from "mongoose"

const guarantorSchema = mongoose.Schema({
    loanId: {type: mongoose.Schema.Types.ObjectId , ref: "Loan" , required: true },
    Name: {type:String , required: true},
    CNIC: {type: String , required: true},
    Email: {type: String , required: true} , 
    Address: {type: String , required: true}
})

const Guarantor = mongoose.model("Guarantor" , guarantorSchema)
export default Guarantor