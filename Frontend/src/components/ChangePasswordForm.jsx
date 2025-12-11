import { changePasswordSchema } from '@/utils/schemas/user/UserChangePasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { EyeIcon, EyeOff } from 'lucide-react'

const ChangePasswordForm = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 max-w-xl m-auto p-8 rounded-xl box-shadow"
        >
            {/* Current Password */}
            <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    placeholder="Enter Current Password"
                    {...register("currentPassword")}
                    eyeIcon={
                        <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} >

                            {
                                showCurrentPassword ?
                                <EyeOff size={20} />
                                :
                                <EyeIcon
                                    size={20}
                                /> 
                            }
                        </span>
                    }
                />
                {errors.currentPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.currentPassword.message}
                    </p>
                )}
            </div>

            {/* New Password */}
            <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Enter New Password"
                    {...register("newPassword")}
                    eyeIcon={
                        <span onClick={() => setShowNewPassword(!showNewPassword)} >
                            
                            {
                                showNewPassword ? <EyeOff size={20} /> : 
                            <EyeIcon
                                size={20}
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                            }
                        </span>
                    }
                />
                {errors.newPassword && (
                    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword")}
                    eyeIcon={
                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} >
                            {
                                showConfirmPassword ?
                                <EyeOff size={20} /> : 
                        <EyeIcon
                        size={20}
                        />
                        }
                            </span>
                    }
                />
                {errors.confirmNewPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmNewPassword.message}
                    </p>
                )}
            </div>

            <Button type="submit" className="cursor-pointer">
                Change Password
            </Button>
        </form>
    );
};

export default ChangePasswordForm