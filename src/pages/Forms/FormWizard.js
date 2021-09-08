import React, { Component } from "react"
import MetaTags from 'react-meta-tags'
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  CardTitle,
  Button
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import Swal from "sweetalert2"

class FormWizard extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        article: null,
        title: '',
        body: '',
        description: '',
        tags: [],
       addFormData: {
          title: '',
          body: '',
          description: '',
         tags:[]
        }
      }//State
    this.addArticle = this.addArticle.bind(this)
  }//Constructor
  componentDidMount() {

  }
  addArticle(){
    const data = {
      article: {...this.state.addFormData}
    }

    console.log(this.data)
    axios.post('/api/articles/',data, {headers: {"Authorization": 'Token '
          + localStorage.getItem('token')}}).then(
      res=>{
        Swal.fire({
          title: 'data add successfuly',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            this.props.history.replace('/dashboard');
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
        <div className="page-content">
          <MetaTags>
            <title>New Article</title>
          </MetaTags>
          <Container fluid={true}>
            <Breadcrumbs title="" breadcrumbItem="New Article" />
            <Row>
              <Col lg="9" xl="9" xs="12">
                <Card>
                  <CardBody>
                      <Row>
                        <Col lg="12">
                          <FormGroup className="mb-3">
                            <Label htmlFor="basicpill-firstname-input1">
                              title
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={this.state.addFormData.title}
                              onChange={(e) => this.setState(
                                { addFormData: {...this.state.addFormData, title: e.target.value} })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup className="mb-3">
                            <Label htmlFor="basicpill-phoneno-input3">
                              Description
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={this.state.addFormData.description}
                              onChange={(e) => this.setState(
                                { addFormData: {...this.state.addFormData, description: e.target.value} })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup className="mb-3">
                            <Label htmlFor="basicpill-address-input1">
                              Body
                            </Label>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={this.state.addFormData.body}
                              onChange={(e) =>
                                this.setState(
                                  { addFormData: {...this.state.addFormData, body: e.target.value} })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <Button
                            className="btn btn-secondary"
                            onClick={this.addArticle}
                          >
                            submit
                          </Button>
                        </Col>
                      </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="3" xl="3" xs="12">
                <Card>
                  <Form>
                  <CardTitle>
                      <Row>
                        <Col lg="12">
                          <FormGroup className="m-3">
                            <Label htmlFor="basicpill-firstname-input1">
                              Tags
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              value={this.state.addFormData.tags}
                              onChange={(e) => this.setState(
                                { addFormData: {...this.state.addFormData, tags: e.target.value} })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                  </CardTitle>
                  <CardBody className="border-1 border-dark">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        animation
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck2"
                      >
                        dragon
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck3"
                      >
                       a
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck4"
                      >
                        d
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck5"
                      >
                       X
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck6"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck6"
                      >
                        S
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.state.addFormData.tags}
                        id="defaultCheck7"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck7"
                      >
                      Y
                      </label>
                    </div>
                  </CardBody>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default FormWizard;
