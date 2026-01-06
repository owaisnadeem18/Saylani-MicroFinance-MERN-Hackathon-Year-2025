import { saylaniLogo } from '@/assets'
import { headerItems } from '@/data/adminSidebarLinks'
import { LogOutIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoutModal from '../ui/modals/LogoutModal'
import { useDispatch } from 'react-redux'
import { clearUser } from '@/features/auth/authSlice'
import { handleLogout } from '@/utils/handlers/logoutHandler'
// import { clearUser } from '@/features/auth/authSlice'

const AdminSidebar = () => {

  const [isLoggedOut , setIsLoggedOut] = useState(false)

  // Here, I need to check my path
  const location = useLocation()

  const path = location.pathname

  const dispatch = useDispatch()   
  const navigate = useNavigate()

  return (
    <div className='transition-all ease-in-out duration-500  h-dvh fixed top-0 left-0 w-full lg:w-[300px]' >

      <div className='absolute flex mx-auto top-0 left-0  right-0 bottom-0 my-auto  h-full w-full' >

        <div className='flex flex-col justify-between transition-all duration-300 ' >

          {/* Now , this is the top section , we have to implement logo , dashboard navbar and log out icon here */}
          <div className='flex flex-col gap-4 h-full' >


            {/* This is the logo of our saylani microfinance app */}
            <div className='logo-div' >
              <img src={saylaniLogo} className='py-6 px-4' alt="" />
            </div>

            <div className="flex-1 px-4 flex flex-col gap-4 justify-evenly py-4 lg:py-6 2xl:py-10">

              {/* Here, we need to add the navbar and logout icon inside it */}

              <nav className='flex-1 flex flex-col gap-8 text-white text-sm font-medium' >
                
                {

                  
                  headerItems.map((item , index) => {

                    
                    
                    const isActive = path === item?.route 
                    
                    return (
                      
                      <Link to={item?.route}>
                      <div className={`px-4 py-2 cursor-pointer flex gap-2 items-center rounded-full ${isActive ? "bg-white text-[#024d9a]" : "hover:bg-white/20" } `} key={index} >
                        <item.icon />
                        <span>{item?.text}</span>
                    </div>
                      </Link>

)
})}




              </nav>

              {/* Logout Icon */}
              <div className='flex justify-start text-white text-sm font-medium' onClick={() => setIsLoggedOut(true)} >
                <div className='flex items-center rounded-full gap-2 cursor-pointer hover:bg-white/20 transition px-4 py-2' >
                  <LogOutIcon />
                  <h1 className='text-[16px]' >
                    Logout
                  </h1>
                </div>
              </div>

            </div>

          </div>

        </div>


      </div>

      {
        isLoggedOut && <LogoutModal open={isLoggedOut} onClose= { () => setIsLoggedOut(false)} onConfirm={() => handleLogout(dispatch , navigate)} />
      }

    </div>
  )
}

export default AdminSidebar
