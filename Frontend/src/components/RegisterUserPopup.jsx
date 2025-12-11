import React from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userRegisterSchema } from '@/utils/schemas/user/UserRegisterSchema'
import useRegisterForm from '@/hooks/user/useRegisterForm'
import { useNavigate } from 'react-router-dom'
                                                  
const RegisterUserPopup = () => {

    const {registerUserHandler , loading} = useRegisterForm()

    const navigate = useNavigate()

    // initialize and connect react hook form with it:   

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(userRegisterSchema)
    })

    const onSubmit = async (data) => {
        console.log(data)

        const res = await registerUserHandler(data)

        if (res.success) {              
            reset() 
            navigate("/user/login")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="outline" className="cursor-pointer" >Proceed</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center" >Register</DialogTitle>
                    <DialogDescription className="text-center" >
                        Enter the required information to proceed with your loan application.
                    </DialogDescription>
                </DialogHeader>

                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Enter your full name" {...register("name")} />                                          

                        {
                            errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )
                        }

                    </div>



                    <div className="grid gap-2">
                        <Label htmlFor="cnic">CNIC</Label>
                        <Input id="cnic" name="cnic" placeholder="12345-6789012-3" {...register("cnic")} />
                        {errors.cnic && (
                <p className="text-red-500 text-sm">{errors.cnic.message}</p>
              )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="example@gmail.com" {...register("email")} />
                        {
                            errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )
                        }
                    </div>

                    <DialogFooter>
                        <DialogClose asChild >
                            <Button variant="outline" onClick = {() => reset()} className = "cursor-pointer" >Cancel</Button>
                        </DialogClose>

                        <Button type="submit" className = "cursor-pointer" >{loading ? "Processing..." : "Submit"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default RegisterUserPopup
