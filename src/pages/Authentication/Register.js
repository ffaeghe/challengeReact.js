import React, { Component } from "react"
import PropTypes from "prop-types"
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// action
import { apiError, registerUser, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
     user:{
       username: null,
       email: null,
       password:null
     }
    }

    this.creatAccount = this.creatAccount.bind(this)
    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.props.registerUser(values)
  }

  componentDidMount() {
    this.props.apiError("")
    this.props.registerUserFailed("")
  }
  creatAccount(){
    const data= {
      user: {...this.state.user}
    }
    axios.post('/api/users',data, {headers: {"Authorization": 'Token '
          + localStorage.getItem('token')}}).then(
      res=>{
        Swal.fire({
          title: 'account create Successfully',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.props.history.replace('/login');
          }
        })
      }
    ).catch(
      err=>{
        console.log(err)
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className=" bg-soft">
                    <Row>
                      <Col className="col-12">
                        <div className=" p-4">
                          <h1 className="text-center text-black-50">Register</h1>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      <AvForm
                        className="needs-validation"
                        onValidSubmit={this.creatAccount}
                      >
                        {this.props.user && this.props.user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {console.log(this.props.user)}
                        {this.props.registrationError &&
                        this.props.registrationError ? (
                          <Alert color="danger">
                            {this.props.registrationError}
                          </Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvField
                            name="username"
                            label="User"
                            type="text"
                            placeholder="Enter user"
                            value={this.state.user.username}
                            onChange={(e) => this.setState(
                              { user: {...this.state.user, username: e.target.value} })}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            value={this.state.user.email}
                            onChange={(e) => this.setState(
                              { user: {...this.state.user, email: e.target.value} })}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            value={this.state.user.password}
                            onChange={(e) => this.setState(
                              { user: {...this.state.user, password: e.target.value} })}
                            placeholder="Enter Password"
                            required
                          />
                        </div>

                        <div className="mt-4 d-grid">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>

                        <div className="mt-4">
                          <p>
                            Already Registered ?{" "}
                            <Link
                              to="/login"
                              className="fw-medium "
                            >
                              {" "}
                              <b className="text-black-50"> Login</b>
                            </Link>{" "}
                          </p>
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

Register.propTypes = {
  apiError: PropTypes.any,
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.any,
  registrationError: PropTypes.any,
  user: PropTypes.object,
}

const mapStateToProps = state => {
  const { user, registrationError, loading } = state.Account
  return { user, registrationError, loading }
}

export default connect(mapStateToProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register)
