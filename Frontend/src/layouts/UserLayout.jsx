import Footer from '@/components/ui/shared/Footer'
import Header from '@/components/ui/shared/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default UserLayout