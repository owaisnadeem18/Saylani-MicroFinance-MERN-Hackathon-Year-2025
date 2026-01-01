import useGetUser from '@/hooks/user/useGetUser'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from './ui/spinner'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

const UserProfile = () => {

    const params = useParams()

    console.log(params)

    const id = params.id

    // Now, I have to call the custom hook in this component

    const {info , loading} = useGetUser(id)

    console.log("The user info is => ", info)

  return (
        <div className="bg-[#F9FAFB] min-h-[calc(100dvh-88px)] py-12">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
            User Profile
          </h1>

          <Card className="shadow-lg border-none">
            <CardHeader className="bg-[#024D9A] text-white rounded-t-xl p-6">
              <CardTitle className="text-2xl">
                {info?.user?.Name || "User Name"}
              </CardTitle>
              <p className="text-sm opacity-80">{info?.user?.Email || "No Email"}</p>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              {/* Full Name */}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Full Name</span>
                <span className="text-gray-900">{info?.user?.Name}</span>
              </div>

              <Separator />

              {/* Email */}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email</span>
                <span className="text-gray-900">{info?.user?.Email}</span>
              </div>

              <Separator />

              {/* CNIC */}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">CNIC</span>
                <span className="text-gray-900">{info?.user?.CNIC}</span>
              </div>

              <Separator />

              {/* Role */}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Role</span>
                <span className="capitalize text-gray-900">{info?.user?.role}</span>
              </div>

              <Separator />

              {/* Date Created */}
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Date Created</span>
                <span className="text-gray-900">
                  {info?.user?.DateCreated &&
                    new Date(info.user.DateCreated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
)
}

export default UserProfile
