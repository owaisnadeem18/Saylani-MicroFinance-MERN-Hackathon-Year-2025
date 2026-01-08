import { saylaniLogo, saylaniSmallLogo } from '@/assets'
import { headerItems } from '@/data/adminSidebarLinks'
import { LogOutIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoutModal from '../../ui/modals/LogoutModal'
import { useDispatch, useSelector } from 'react-redux'
import { setMenu } from '@/features/auth/authSlice'
import { handleLogout } from '@/utils/handlers/logoutHandler'

const AdminSidebar = () => {

  const [isLoggedOut, setIsLoggedOut] = useState(false)
             
  const menu = useSelector(state => state?.auth?.menu)

  // Here, I need to check my path
  const location = useLocation()

  const path = location.pathname

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggle = () => {
    dispatch(setMenu(!menu))
  }

  // Now, here we need to check window inner width and calling the function inside the useEffect: 

  useEffect(() => {
    
      const onResize = () => {
        dispatch(setMenu(window.innerWidth >= 999))
      }

      // First call it on mount: 
      onResize()

      window.addEventListener("resize" , onResize)

      return () => {
        window.removeEventListener("resize" , onResize)
      }

  } , [dispatch])

  return (
    <div className={`transition-all ease-in-out duration-500 flex-none ${menu ? "w-full lg:w-[300px]" : "w-16 md:w-20"} text-white`} >
    <div
      className={`transition-all ease-in-out duration-500 h-dvh fixed  top-0 left-0 bg-[#024D9A] ${menu ? "w-full lg:w-[300px]" : "w-16 md:w-20"
        }`} >
      <div className='absolute flex mx-auto top-0 left-0  right-0 bottom-0 my-auto  h-full w-full' >

        <div className={`flex flex-col justify-between transition-all duration-300 ${menu ? "w-[300px]" : "w-16 md:w-20"}`} >

          {/* Now , this is the top section , we have to implement logo , dashboard navbar and log out icon here */}
          <div className='flex flex-col gap-4 h-full' >


            {/* This is the logo of our saylani microfinance app  */}
            {/* On the click of it we will toggle menu */}
            <div className='logo-div cursor-pointer flex justify-center' onClick={handleToggle} >

              <img src={menu ? saylaniLogo : saylaniSmallLogo} className={`px-4 pt-6 transition-all ease-in-out duration-500 object-contain `}
                alt="" />

            </div>

            <div className="flex-1 px-4 flex flex-col gap-4 justify-evenly py-4 lg:py-6 2xl:py-10">

              {/* Here, we need to add the navbar and logout icon inside it */}

              <nav className={`flex-1 flex flex-col gap-8 text-white text-sm font-medium ${menu ? "items-start" : "items-center"}`} >

                {


                  headerItems.map((item, index) => {

                    const isActive = path.startsWith(item?.route)

                    return (

                      <Link to={item?.route} className= {`${menu ? "w-full lg:w-3/4" : "w-fit rounded-full"}`} >
                        <div className={`px-4 py-2 cursor-pointer flex gap-2 items-center rounded-full ${isActive ? "bg-white text-[#024d9a]" : "hover:bg-white/20"} ${menu ? "" : "w-[50px] h-[50px]"} `} key={index} >
                          <item.icon />
                          {  
                            menu &&
                              <span>{item?.text}</span>}
                        </div>
                      </Link>

                    )
                  })}

              </nav>

              {/* Logout Icon */}
              <div className='flex justify-start text-white text-sm font-medium' onClick={() => setIsLoggedOut(true)} >
                <div className={`flex items-center rounded-full gap-2 cursor-pointer hover:bg-white/20 transition px-4 py-2 ${!menu && "w-[50px] h-[50px]"}`} >
                  <LogOutIcon />

                  {
                    menu &&
                  <h1 className='text-[16px]' >
                    Logout
                  </h1> 
                  }

                </div>
              </div>

            </div>

          </div>

        </div>


      </div>

      {
        isLoggedOut && <LogoutModal open={isLoggedOut} onClose={() => setIsLoggedOut(false)} onConfirm={() => handleLogout(dispatch, navigate)} />
      }

    </div>
      </div>
  )
}

export default AdminSidebar
