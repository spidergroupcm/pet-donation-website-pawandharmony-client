import { BsFillHouseAddFill } from 'react-icons/bs'

import { FaHome } from "react-icons/fa";
import { FaDog } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FiDollarSign } from "react-icons/fi";
import MenuItem from './MenuItem'
const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add PETS'
        address='add-pets'
      
      />
       <MenuItem icon={FaDog} label='My added pets' address='my-addedpets' />
      
      


      <MenuItem
        icon={FaHome }
        label='Adoption Request'
        address='adoption-request'
      />


    <MenuItem
        icon={FaMoneyCheckAlt}
        label='Create Donation Campaign'
        address='create-donation-camp'
      />    

      <MenuItem
        icon={FaMoneyBill1Wave }
        label='My Donation Campaign'
        address='my-donation-camp'
      />    

      <MenuItem
        icon={FiDollarSign }
        label='My Donations'
        address='my-donations'
      />    







    </>
  )
}

export default UserMenu