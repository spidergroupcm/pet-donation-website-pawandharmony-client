import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Navbar from '../components/Navbar'


const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1 md:ml-64 p-5">
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout




// import { Outlet } from 'react-router-dom'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'




// const DashboardLayout = () => {
//   return (
//     <div className='relative min-h-screen md:flex bg-white'>
//       <Sidebar></Sidebar>

//       {/* Right Side: Dashboard Dynamic Content */}

//       <div className='flex-1  md:ml-64'>

//         <div className='p-5'>
//           <Outlet />
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default DashboardLayout

