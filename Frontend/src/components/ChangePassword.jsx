import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePassword = () => {
    return (
        <div className='min-h-[calc(100dvh-88px)]  max-w-7xl m-auto p-6' >

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-gray-800 mb-5">
                Change Your Password
            </h3>

            <ChangePasswordForm />


        </div>
    )
}

export default ChangePassword
