import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";

import Home from "../pages/Home";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/SignUp";
import AllPets from "../pages/AllPets";
import DonationCampaigns from "../pages/DonationCampaigns";
import DashboardLayout from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";

import Profile from "../pages/Dashboard/Common/Profile";
import AddPets from "../pages/Dashboard/User/AddPets";
import MyAddedPets from "../pages/Dashboard/User/MyAddedPets";
import PetDetails from "../pages/Petdetails/PetDetails";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

import AdoptionRequest from "../pages/AdoptionRequest";
import CreateDonationCampaign from "../pages/CreateDonationCampaign";
import MyDonationCampaign from "../pages/MyDonationCampaign";
import MyDonations from "../pages/MyDonations";
import AllPetsAdmin from "../pages/AllPetsAdmin";
import AllCampaigns from "../pages/AllCampaigns";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        
        <Main />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pet-listing",
        element: <AllPets />,
      },
      {
        path: "/donation-campaigns",
        element: <DonationCampaigns />,
      },
      {
        path: '/pet/:id',
        element: <PetDetails></PetDetails>,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-pets",
        element: (
          <PrivateRoute>
            <AddPets></AddPets>
          </PrivateRoute>
        ),
      },
      {
        path: "my-addedpets",
        element: (
          <PrivateRoute>
        
            <MyAddedPets></MyAddedPets>
            
            
          </PrivateRoute>
        ),
      },

      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            
              <ManageUsers />
            
          </PrivateRoute>
        ),
      },

      {
        path: 'adoption-request',
        element: (
          <PrivateRoute>
            
              <AdoptionRequest></AdoptionRequest>
            
          </PrivateRoute>
        ),
      },

  
      {
        path: 'create-donation-camp',
        element: (
          <PrivateRoute>
            
              <CreateDonationCampaign></CreateDonationCampaign>
            
          </PrivateRoute>
        ),
      },

      
      {
        path: 'my-donation-camp',
        element: (
          <PrivateRoute>
            
              <MyDonationCampaign></MyDonationCampaign>
            
          </PrivateRoute>
        ),
      },

      
      {
        path: 'my-donations',
        element: (
          <PrivateRoute>
            
              <MyDonations></MyDonations>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'all-pets',
        element: (
          <PrivateRoute>
            
             <AllPetsAdmin></AllPetsAdmin>
            
          </PrivateRoute>
        ),
      },
      {
        path: 'all-donations',
        element: (
          <PrivateRoute>
            
              <AllCampaigns></AllCampaigns>
            
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    
    ],
  },
]);

export default router;

