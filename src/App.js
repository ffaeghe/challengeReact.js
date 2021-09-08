import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { connect } from "react-redux"
import axios from 'axios'

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/"
import AppRoute from "./routes/route"

// layouts
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

axios.defaults.baseURL = 'https://conduit-api-realworld.herokuapp.com'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.getLayout = this.getLayout.bind(this)
  }
  getLayout = () => {
    let layoutCls = VerticalLayout
    layoutCls = VerticalLayout
    return layoutCls
  }

  render() {
    const Layout = this.getLayout()

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
