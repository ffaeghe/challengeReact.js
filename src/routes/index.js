import React from "react"
import { Redirect } from "react-router-dom"


//dashboard
import Dashboard from '../pages/Dashboard/index'

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"


import FormWizard from "../pages/Forms/FormWizard"
import EditArticle from "../pages/Dashboard/EdtiArticle"






const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: '/editArticle/:slug', component: EditArticle },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },

  // Forms
  { path: "/form-wizard", component: FormWizard },

]
const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },


]

export { authProtectedRoutes, publicRoutes }
