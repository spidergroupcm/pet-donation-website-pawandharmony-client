
import { useState } from 'react'

import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from './Menu/MenuItem'

// import useAuth from '../../../hooks/useAuth'

import AdminMenu from './Menu/AdminMenu'
import { Link } from 'react-router-dom'
import UserMenu from './Menu/UserMenu'
import useRole from '../../../hooks/useRole'

// import logo from '../../../assets/logo/logo.png'
const Sidebar = () => {
  // const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
     

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
        

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-10'>
            <nav>

                   
          <UserMenu />

          {role === 'admin' && <AdminMenu />}

         
          
            </nav>

          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />
         
        </div>
      </div>
    </>
  )
}

export default Sidebar



