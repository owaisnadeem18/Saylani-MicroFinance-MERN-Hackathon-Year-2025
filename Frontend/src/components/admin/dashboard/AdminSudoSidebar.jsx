import { setMenu } from '@/features/auth/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminSudoSidebar = () => {

  const menu = useSelector(state => state?.auth?.menu)

  const dispatch = useDispatch()

  useEffect(() => {

    const onResize = () => {
        setMenu(window.innerWidth >= 999) 
    }

    onResize()

    window.addEventListener("resize" , onResize)

    return () => {
      window.removeEventListener("resize" , onResize)
    }

  } , [dispatch])

  return (
        <div
      className={`transition-all ease-in-out duration-500  h-screen  ${
        menu ? "w-20 lg:w-[300px]" : "w-16 md:w-20"
      } `}
    ></div>
  )
}

export default AdminSudoSidebar
