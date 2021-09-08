import PropTypes from 'prop-types'
import React, { Component } from "react"
import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Reactstrap


//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import { toggleRightSidebar } from "../../store/actions"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearch: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleRightbar = this.toggleRightbar.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback()
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar()
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="text-white logo-sm">
                     Arvan challenge
                  </span>
                  <span className="text-white logo-lg">
                   Arvan challenge
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="text-white logo-lg">
                  Arvan challenge
                  </span>
                  <span className="text-white logo-sm">
                  Arvan challenge
                  </span>
                </Link>
              </div>

              <button
                type="button"
                onClick={this.toggleMenu}
                className="btn btn-sm px-3 font-size-16 header-item waves-effect "
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars text-white"></i>
              </button>
              <div className="">
                <Link to="/" className="logo logo-dark">
                  <span className="text-white logo-sm">
                     welcome {localStorage.getItem('user')}
                  </span>
                  <span className="text-white logo-lg">
                   welcome {localStorage.getItem('user')}
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="text-white logo-lg">
                      welcome {localStorage.getItem('user')}
                  </span>
                  <span className="text-white logo-sm">
                    welcome {localStorage.getItem('user')}
                  </span>
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout
  return { layoutType }
}

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withTranslation()(Header)
)

Header.propTypes = {
  t: PropTypes.any,
  toggleMenuCallback: PropTypes.any,
  toggleRightSidebar: PropTypes.func
}