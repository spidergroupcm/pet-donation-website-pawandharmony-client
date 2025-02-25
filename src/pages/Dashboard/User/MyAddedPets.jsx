// import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// import PetDataRow from '../../../components/Dashboard/TableRows/PetDataRow';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

// const MyAddedPets = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const axiosSecure = useAxiosSecure();
//   const {
//     data: pets = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['pets'],
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/pets/userData`);
//       return data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   const totalPages = Math.ceil(pets.length / itemsPerPage);
//   const paginatedPets = pets.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>My Added Pets</title>
//       </Helmet>
//       <div className="container mx-auto px-4 sm:px-8">
//         <div className="py-8">
//           <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//             <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//               <table className="min-w-full leading-normal">
//                 <thead>
//                   <tr>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Sl.No
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Category
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Adoption Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Delete
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Update
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
//                     >
//                       Adopt
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedPets.map((pet, index) => (
//                     <PetDataRow
//                       key={pet._id}
//                       pet={pet}
//                       refetch={refetch}
//                       index={(currentPage - 1) * itemsPerPage + index + 1}
//                     />
//                   ))}
//                 </tbody>
//               </table>
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-4">
//                   <nav className="inline-flex shadow-sm">
//                     {[...Array(totalPages).keys()].map((page) => (
//                       <button
//                         key={page + 1}
//                         onClick={() => handlePageChange(page + 1)}
//                         className={`px-4 py-2 mx-1 text-sm font-medium rounded-md ${
//                           currentPage === page + 1
//                             ? 'bg-blue-500 text-white'
//                             : 'bg-gray-200 text-gray-700'
//                         } hover:bg-blue-400 hover:text-white`}
//                       >
//                         {page + 1}
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyAddedPets;




import { Helmet } from 'react-helmet-async'

import PetDataRow from '../../../components/Dashboard/TableRows/PetDataRow'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyAddedPets = () => {
  const axiosSecure = useAxiosSecure()
  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/pets/userData`)
     

      return data
    },
  })
  console.log(pets)
  if (isLoading) return <LoadingSpinner />
  return (
    <>
      <Helmet>
        <title>My Added Pets</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                  <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Sl.No
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Adoption Status
                    </th>
                   

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Adopt
                    </th>
                  </tr>
                </thead>
                <tbody>
                {pets.map((pet, index) => (
          <PetDataRow
            key={pet._id}
            pet={pet}
            refetch={refetch}
            index={index}
          />
        ))}

        <tbody>
    
      </tbody>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAddedPets


