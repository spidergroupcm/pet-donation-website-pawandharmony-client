import { FaUserCog } from 'react-icons/fa'
import { FaCat } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Users' address='manage-users' />
      <MenuItem icon={FaCat} label='All Pets ' address='all-pets' />
      <MenuItem icon={FaSackDollar} label='All Donations  ' address='all-donations' />
      
    </>
    
  )
}

export default AdminMenu