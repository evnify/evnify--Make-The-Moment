import React from 'react'
import { UserSideMenu,UserRoutes } from '../../components'
import NavBar from '../../components/users/navBar'
import {Footer } from "../../components";



function UserProfile() {

  return (

    
    <div className="Emp_DashboardContainer"style={{overflowX : "hidden"}}>
    <NavBar />
    <div className="Emp_DashboardContainer" >
      <div className="Emp_SideMenuAndPageContent">
        <UserSideMenu />
        <div className="Emp_PageContent">
          <UserRoutes />
        </div>
      </div>
      <Footer />
    </div>
  </div>
  
);
}

export default UserProfile