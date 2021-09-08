import React, { Component } from "react"
import PropTypes from 'prop-types'
import axios from 'axios'
import {  Card,
  CardBody,
  Col,
  Container,
  Row } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"


// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
 import { apiError, loginUser, socialLogin } from "../../store/actions"



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null,
      loggedIn: false,
      errorMessage: '',
      findError: false,
    }
    // handleSubmit
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e=>{
    e.preventDefault();
    let message
    const data = {
      user: {
        email: this.email,
        password: this.password,
      }
    }
    axios.post('api/users/login', data).then(
      res=>{
        localStorage.setItem('token', res.data.user.token)
        localStorage.setItem('userAuth', 'true')
        localStorage.setItem('user', res.data.user.username)
        this.setState({
          status: res.data.status
        })
        this.setState({
          loggedIn: true,
          email: res.data.email,
          password: res.data.password,
        })
        if(this.state.loggedIn){
          window.location.href = "/dashboard"
        }
      }
    ).catch(
      err=>{
          switch (err) {
            case 404:
              message = "cant find this page";
              break;
            case 500:
              message =
                "username or password uncorrected  try again please!";
              break;
            case 401:
              message = "Try again please!!";
              break;
            case 204:
              message = 'this value undefined!'
              break
            default:
              message = err[1];
              break;
          }

        this.setState({
          errorMessage: message,
          findError: true
        }, ()=>{
          console.log("errorMessage:", message)
        })
      }
    )
  }

  render() {
    return (
      <React.Fragment >
        {this.state.findError && <div className="home-btn d-none d-sm-block boxError">
          <Link to="/" className="txtError">
            <b>Login Failed! username and/or password is invalid!</b>{this.state.errorMessage}
            <i className="fa fa-times closeError" onClick={()=>{this.setState({findError: false})}}/>
          </Link>
        </div>}
        <div className="account-pages my-5 pt-sm-5 mt-xs-5" >
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden bg-bgGray">
                  <div className="bg-soft card-title">
                    <Row>
                      <Col className="col-12">
                        <div className=" p-4">
                          <h1 className="text-center text-uppercase text-black-50">Login</h1>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            value="email"
                            className="form-control"
                            placeholder="email"
                            type="text"
                            onChange={e=>this.email = e.target.value}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            value="123456"
                            type="password"
                            onChange={e=>this.password = e.target.value}
                            required
                            placeholder="Enter Password"
                          />
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light btnLogin"
                            type="submit"

                          >
                            Log In
                          </button>
                        </div>

                        <div className="mt-4 ">
                          <Link to="/register" className="text-muted">
                            Don't have account? <b>Register Now</b>
                          </Link>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)
