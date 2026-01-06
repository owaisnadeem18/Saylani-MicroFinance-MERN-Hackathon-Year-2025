import bcrypt from "bcrypt"

const password = "Admin@123"

const adminPasswordHashed = async () => {

    const hashed = await bcrypt.hash(password , 10)

    console.log(hashed)


} 

console.log(adminPasswordHashed())