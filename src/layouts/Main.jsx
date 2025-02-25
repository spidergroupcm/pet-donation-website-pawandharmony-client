

import { Outlet } from 'react-router-dom'
import ScrollToTop from '../routes/ScrollToTop'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'



const Main = () => {
  return (
    <div className='bg-white'>
      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>
      
      <div>
        <div className='min-h-[calc(100vh-68px)]'>
        <Outlet />
        </div>
      </div>
      <div>
      <Footer></Footer>
      </div>
      
    </div>
  )
}

export default Main

