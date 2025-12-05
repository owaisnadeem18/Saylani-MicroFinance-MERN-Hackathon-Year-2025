import mongoose from "mongoose"

const QRSchema = mongoose.Schema({
    loanId: {type: mongoose.Schema.ObjectId , ref: "Loan" , required: true} , 
    tokenNumber: {type: Number , required: true , unique: true} ,
    QRCodeImage: {type: String , required: true},
    appointment: {
        date: {
            type: Date,
        },
        time: {
            type: String,
        },
        officeLocation: {
            type: String,
        }
    }
} , { timestamps: true } )

const QR = mongoose.model("QR" , QRSchema)

export default QR