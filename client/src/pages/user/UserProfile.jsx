import React from 'react'
import { UserSideMenu,UserRoutes } from '../../components'
import NavBar from '../../components/users/navBar'



function UserProfile() {

  return (
    <><NavBar />
    <div className="Emp_DashboardContainer">
      <div className="Emp_SideMenuAndPageContent">
        <UserSideMenu />
        <div className="Emp_PageContent">
          <UserRoutes />
        </div>
      </div>
    </div>
    </>
);
}

export default UserProfile