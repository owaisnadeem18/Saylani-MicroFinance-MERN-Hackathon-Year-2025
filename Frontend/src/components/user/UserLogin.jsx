import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from '../ui/label'
import { EyeClosed, EyeIcon, EyeOff } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { userLoginSchema } from '@/utils/schemas/user/UserLoginSchema'
import useLoginForm from '@/hooks/user/useLoginForm'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

    // calling the custom hook of login user 

    const { loading, userLoginHandler } = useLoginForm()


    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }                               
    } = useForm({
        resolver: zodResolver(userLoginSchema)
    })

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data) => {

        try {
              const res = await userLoginHandler(data)

        console.log("Response in the on submit is -> ", res)

        if (res?.success) {                                

            reset()
            console.log(data)

            if (res?.userExists?.mustChangePassword) {
                // It will tell the user that this is compulsory to change the password if it's (must change password is true)
                navigate(`/user/${res?.userExists.id}/change-password`)
           }

        }

        }
        
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='min-h-[calc(100vh-88px)]' >


            <div className='flex justify-center flex-col items-center gap-5 min-h-[calc(100vh-88px)] mx-8 sm:mx-0' >

                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">
                    Login 
                </h1>


                <form className='grid gap-6 px-6 py-8 box-shadow max-w-2xl rounded-xl w-full sm:w-[440px]' onSubmit={handleSubmit(onSubmit)} >

                    <div className='grid gap-2' >

                        <Label htmlFor="email" > Email </Label>
                        <Input id="email" {...register("email")} placeholder={"Enter Email Address"} />
                        {
                            errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
                        }

                    </div>

                    <div className='grid gap-2' >

                        <Label htmlFor="email" > Password </Label>
                        <Input eyeIcon={
                            <span onClick={() => setShowPassword(!showPassword)} >
                                {showPassword ? <EyeOff size={20} /> :
                                    <EyeIcon
                                        size={20}
                                    />}
                            </span>

                        } id="password" type={showPassword ? "text" : "password"}  {...register("password")} placeholder="Enter Password" />

                        {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    </div>

                    <Button type="submit" className="cursor-pointer" > {loading ? "Logging In..." : "Login"} </Button>

                </form>
            </div>
        </div>
    )
}

export default UserLogin
